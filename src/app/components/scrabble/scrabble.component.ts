import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-scrabble',
  templateUrl: './scrabble.component.html',
  styleUrls: ['./scrabble.component.scss']
})
export class ScrabbleComponent implements OnInit, AfterViewInit {
  MAX_INPUT_LEN = 10;
  inputs: string[] = [];
  currentIndex = 0;
  showTopScores = false;
  scribbleInputRegex = /\S/gm;

  @ViewChildren('inputScrabble') inputScrabble: QueryList<ElementRef> | null = null;
  constructor (private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.inputs = Array(this.MAX_INPUT_LEN).fill('');
  }

  ngAfterViewInit(): void {
    this.inputScrabble?.first.nativeElement.focus();
  }

  scrabbleTileInput(value: string, index: number): void {
    console.log(value);
    if(value == ' ') {
      this.inputs[index] = '';
      this.refocus();
    } else if(index < this.MAX_INPUT_LEN && value) {
      this.currentIndex++;
      this.refocus();
    }
  }

  scrabbleTileKeyUp(event: KeyboardEvent, index: number): void {
    if(event.key == 'Backspace') {
      this.backspace(index);
    } else if(event.key == 'Enter') {
      this.submit();
    } else {
      if(this.inputs[index] && this.currentIndex < this.MAX_INPUT_LEN) {
        this.currentIndex++;
        this.inputs[this.currentIndex] = event.key;
        this.refocus();
      }
    }

    this.changeDetector.detectChanges();
    console.log(this.inputs);
  }

  backspace(index: number): void {
    if(index > 0) {
      this.currentIndex--;
    }
    console.log(this.currentIndex);
    this.refocus();
  }

  focusInput(index: number) {
    if(index > 0) {
      this.currentIndex = index;
    }
    this.refocus();
  }

  refocus() {
    this.inputScrabble?.get(this.currentIndex)?.nativeElement.focus();
  }

  scrabbleWord(): string {
    if(this.inputScrabble) {
      return this.inputScrabble?.map(input => input.nativeElement.value).join('');
    }
    return '';
  }

  submit(): void {
    let a = this.scrabbleWord();

    console.log(this.inputs);
  };

  @HostListener('window:focus', ['$event'])
  pageFocus(): void {
    if(this.inputScrabble) {
      this.refocus();
    }
  }

  resetTiles(): void {
    this.currentIndex = 0;
    this.refocus();
    this.inputScrabble?.forEach(scrabbleTile => {
      scrabbleTile.nativeElement.value = '';
    });
  }

  saveScore(): void {

  }

  viewTopScores(show: boolean): void {
    this.showTopScores = show;
    console.log(show);
  }

  test(): void {
    this.submit();
  }


  trackByFn(index: number, item: string) {
    return index;
  }

}
