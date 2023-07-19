import {AfterContentChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-scrabble',
  templateUrl: './scrabble.component.html',
  styleUrls: ['./scrabble.component.scss']
})
export class ScrabbleComponent implements OnInit, AfterViewInit {
  MAX_INPUT_LEN = 10;
  inputs: string[] = [];
  currentIndex = 0;

  @ViewChildren('inputScrabble') inputScrabble: QueryList<ElementRef> | null = null;

  ngOnInit(): void {
    this.inputs = Array(this.MAX_INPUT_LEN).fill('');
  }

  ngAfterViewInit(): void {
    this.inputScrabble?.first.nativeElement.focus();
  }

  scrabbleKeyUp(event: KeyboardEvent, index: number): void {
    const value = (event.target as HTMLInputElement).value;
    console.log(event);
    if(event.key == 'Enter') {
      this.submit();
    } else if(value == ' ') {
      this.refocus();
    } else if(index < this.MAX_INPUT_LEN && value && event.key != 'Backspace') {
      this.currentIndex++;
      this.refocus();
    }
    else {
      if(index < this.MAX_INPUT_LEN) {
        this.currentIndex--;
      }
      this.refocus();
    }

  }

  focusInput(index: number) {
    this.currentIndex = index;

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
    alert(a);
  };

  @HostListener('window:focus', ['$event'])
  pageFocus(): void {
    if(this.inputScrabble) {
      this.refocus();
    }
  }

  test(): void {
    this.submit();
  }


}
