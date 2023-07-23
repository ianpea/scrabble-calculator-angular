import {AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Constants} from '../../constants/constants';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Score, ScoreMapping} from 'src/app/interfaces/interfaces';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {TopScoresComponent} from '../top-scores/top-scores.component';

@Component({
  selector: 'app-scrabble',
  templateUrl: './scrabble.component.html',
  styleUrls: ['./scrabble.component.scss'],

})
export class ScrabbleComponent implements OnInit, AfterViewInit {
  MAX_TILES = 10;

  scrabbleControls: FormControl[] = [];
  scribbleInputRegex = new RegExp('^[a-zA-Z]$');

  showTopScores = false;


  @ViewChildren('inputScrabble') scrabbleHTMLInputs: QueryList<ElementRef> | null = null;

  constructor (private http: HttpClient, private messageService: MessageService, private dialogService: DialogService) { }

  /**
   * Event listener on page focus, so the app will refocus the tile correctly.
   */
  @HostListener('window:focus', ['$event'])
  pageFocus(): void {
    if(this.scrabbleHTMLInputs) {
      this.refocus();
    }
  }

  ngOnInit(): void {
    // Push a set of controllers base on MAX_INPUT_LEN
    for(let i = 0; i < this.MAX_TILES; i++) {
      this.scrabbleControls.push(new FormControl(""));
    }

    // Listen to each state updates of each input FormControl.
    this.scrabbleControls.forEach((scrabbleControl, i) => {
      scrabbleControl.valueChanges.subscribe(value => {
        let passRegex = this.scribbleInputRegex.test(value);
        // If pass regex, patch the value and make it uppercase.
        if(value && passRegex) {
          scrabbleControl.patchValue(value.toUpperCase(), {emitEvent: false});
        }
        // If fail regex, patch the value to empty.
        else {
          scrabbleControl.patchValue("", {emitEvent: false});
        }
        this.refocus();
      });
    });
  }

  ngAfterViewInit(): void {
    this.refocus();
  }

  /**
   * Event handler for the input of CHARACTERS on each tile.
   */
  scrabbleTileInput(value: string, index: number): void {
    if(value == ' ') {
      this.scrabbleControls[index].patchValue("");
      this.refocus();
    } else if(index < this.MAX_TILES && value) {
      this.refocus();
    }
  }

  /**
   * Event handler for the Backspace and Enter KEYBOARD EVENT on each tiles.
   */
  scrabbleTileKeyUp(event: KeyboardEvent, index: number): void {
    if(event.key == 'Backspace') {
      this.clearTile(index);
    } else if(event.key == 'Enter') {
      this.saveScore();
    }
  }

  /**
   * Clear the char on the given scribble tile.
   * @param index 
   */
  clearTile(index: number): void {
    if(index > 0 && this.scrabbleControls[index].value == "") {
      this.scrabbleControls[index - 1].patchValue("");
      this.refocus();
    } else {
      this.scrabbleControls[index].patchValue("");
    }
  }

  /**
   * Refocus the input base on all the current tiles.
   * Will ALWAYS focus the left most empty input on the scrabble tiles.
   */
  refocus() {
    const filledTilesLen = this.scrabbleControls.filter(scrabbleControl => scrabbleControl.value != "").length;
    if(filledTilesLen < this.MAX_TILES) {
      const indexToFocus = this.scrabbleControls.findIndex(scrabbleControl => scrabbleControl.value == "");
      this.scrabbleHTMLInputs?.get(indexToFocus)?.nativeElement.focus();
    } else {
      this.scrabbleHTMLInputs?.get(this.MAX_TILES - 1)?.nativeElement.focus();
    }
  }

  /**
   * Join all the inputs and returns the word.
   * @returns Returns the whole scrabble word.
   */
  scrabbleWord(): string {
    return this.scrabbleControls.map(scrabbleControl => scrabbleControl.value).join('');
  }


  /**
   * Reset all input tiles to original value.
   */
  resetTiles(): void {
    this.scrabbleControls.forEach(input =>
      input.patchValue(""));
    this.refocus();

  }

  /**
   * Save current score.
   */
  saveScore(): void {
    if(this.scrabbleWord().length > 0) {
      const payload = {word: this.scrabbleWord(), score: this.totalScore()};
      this.http.post<Score>("/api/scores", payload, {observe: 'response', responseType: 'json'}).subscribe(
        {
          next: (res: HttpResponse<Score>) => {
            if(res.body?.already_exists) {
              this.messageService.add({key: "main", severity: "info", summary: "Word already exist!", detail: `'${this.scrabbleWord()}' already exist.`});
            } else {
              this.messageService.add({key: "main", severity: "success", summary: "Word submitted!", detail: `'${res.body?.word}' added with score ${res.body?.score}`});
            }
          },
          error: (error: HttpErrorResponse) => {
            this.resetTiles();
          },
          complete: () => {
            this.resetTiles();
          }

        }
      );
    } else {
      this.messageService.add({id: 'emptyTiles', key: "main", severity: "info", summary: "Empty tiles.", });
    }
  }

  /**
   * Triggers the display of the top scores dialog component.
   * @param show true to show, false to hide.
   */
  viewTopScores(show: boolean): void {
    // this.showTopScores = show;
    this.dialogService.open(TopScoresComponent, {
      width: '60%',
      closable: true,
      closeOnEscape: true
    });
  };

  /**
   * To keep track of the multiple FormControl(s) when rendered within an ngFor loop.
   */
  trackByFn(index: number, item: FormControl) {
    return index;
  }

  /**
   * Generate the total score of all current tiles.
   */
  totalScore(): number {
    let score = 0;
    this.scrabbleControls.forEach(input => {
      score += this.computeScore(input.value);
    });
    return score;
  }

  /**
   * Generate the score of a single character.
   * @param char Char to compute
   * @returns Score of the char, 0 if not found.
   */
  computeScore(char: string): number {
    for(let scoreMapEntry of Constants.ScoreMap) {

      if(scoreMapEntry.value.includes(char)) {
        return scoreMapEntry.score;
      }
    }
    return 0;
  }
};
