import {AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Constants} from '../../constants/constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Score} from 'src/app/interfaces/interfaces';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-scrabble',
  templateUrl: './scrabble.component.html',
  styleUrls: ['./scrabble.component.scss'],

})
export class ScrabbleComponent implements OnInit, AfterViewInit {
  MAX_INPUT_LEN = 10;

  scrabbleControls: FormControl[] = [];
  scribbleInputRegex = new RegExp('^[a-zA-Z]$');

  showTopScores = false;


  @ViewChildren('inputScrabble') scrabbleHTMLInputs: QueryList<ElementRef> | null = null;
  constructor (private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {
    for(let i = 0; i < this.MAX_INPUT_LEN; i++) {
      this.scrabbleControls.push(new FormControl(""));
    }

    this.scrabbleControls.forEach((scrabbleControl, i) => {
      scrabbleControl.valueChanges.subscribe(value => {
        let passRegex = this.scribbleInputRegex.test(value);
        if(value && passRegex) {
          scrabbleControl.patchValue(value.toUpperCase(), {emitEvent: false});
        }
        else {
          scrabbleControl.patchValue("", {emitEvent: false});
        }
        this.scrabbleTileInput(value, i);
      });
    });
  }

  ngAfterViewInit(): void {
    this.refocus();
  }

  scrabbleTileInput(value: string, index: number): void {
    if(value == ' ') {
      this.scrabbleControls[index].patchValue("");
      this.refocus();
    } else if(index < this.MAX_INPUT_LEN && value) {
      this.refocus();
    }
  }

  scrabbleTileKeyUp(event: KeyboardEvent, index: number): void {
    if(event.key == 'Backspace') {
      this.clearInput(index);
    } else if(event.key == 'Enter') {
      this.saveScore();
    }
  }

  clearInput(index: number): void {
    if(index > 0 && this.scrabbleControls[index].value == "") {
      this.scrabbleControls[index - 1].patchValue("");
      this.refocus();
    } else {
      this.scrabbleControls[index].patchValue("");
    }
  }

  refocus() {
    const inputLen = this.scrabbleControls.filter(scrabbleControl => scrabbleControl.value != "").length;
    if(inputLen < this.MAX_INPUT_LEN) {
      const indexToFocus = this.scrabbleControls.findIndex(scrabbleControl => scrabbleControl.value == "");
      this.scrabbleHTMLInputs?.get(indexToFocus)?.nativeElement.focus();
    } else {
      this.scrabbleHTMLInputs?.get(this.MAX_INPUT_LEN - 1)?.nativeElement.focus();

    }
  }

  scrabbleWord(): string {
    return this.scrabbleControls.map(scrabbleControl => scrabbleControl.value).join('');
  }

  @HostListener('window:focus', ['$event'])
  pageFocus(): void {
    if(this.scrabbleHTMLInputs) {
      this.refocus();
    }
  }

  resetTiles(): void {
    this.scrabbleControls.forEach(input =>
      input.patchValue(""));
    this.refocus();

  }

  saveScore(): void {
    if(this.scrabbleWord().length > 0) {
      const payload = {word: this.scrabbleWord(), score: this.calculateScore()};
      this.http.post<Score>("/api/scores", payload, {observe: 'response', responseType: 'json'}).subscribe((res: HttpResponse<Score>) => {
        if(res.body?.already_exists) {
          this.messageService.add({key: "main", severity: "info", summary: "Word Already Exist!", detail: `${this.scrabbleWord()} already exist.`});
        } else {
          this.messageService.add({key: "main", severity: "success", summary: "Word Submitted!", detail: `${res.body?.word} added with score ${res.body?.score}`});
        }

        this.resetTiles();
      });
    }
  }

  viewTopScores(show: boolean): void {
    this.showTopScores = show;
    // console.log(show);
  }

  trackByFn(index: number, item: FormControl) {
    return index;
  }


  calculateScore(): number {
    let score = 0;
    this.scrabbleControls.forEach(input => {
      Constants.ScoreMap.forEach((scoreMapEntry) => {
        if(scoreMapEntry.value.includes(input.value)) {
          score += scoreMapEntry.score;
        }
      });
    });
    return score;
  }
}
