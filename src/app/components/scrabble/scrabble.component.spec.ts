import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ScrabbleComponent} from './scrabble.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {ReactiveFormsModule} from '@angular/forms';

describe('ScrabbleComponent', () => {
  let component: ScrabbleComponent;
  let fixture: ComponentFixture<ScrabbleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrabbleComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [MessageService, DialogService]
    });
    fixture = TestBed.createComponent(ScrabbleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as MAX_TILES as 10`, () => {
    // const fixture = TestBed.createComponent(ScrabbleComponent);
    // const app = fixture.componentInstance;
    expect(component.MAX_TILES).toEqual(10);
  });

  it(`should have as scrabbleControls as []`, () => {
    expect(component.scrabbleControls).toEqual([]);
  });

  it(`should have as scrabbleControls as length 10 after ngOnInit`, () => {
    component.ngOnInit();
    expect(component.scrabbleControls.length).toEqual(10);
  });


  it(`should have as scrabbleHTMLInputs as null before component rendered`, () => {
    component.ngOnInit();
    expect(component.scrabbleHTMLInputs).toEqual(null);
  });


  it(`should have scrabbleHTMLInputs with length MAX_TILES after component rendered.`, () => {
    fixture.detectChanges();
    expect(component.scrabbleHTMLInputs?.length).toEqual(component.MAX_TILES);
  });

  it(`should render scrabbleHTMLInputs with length MAX_TILES after component rendered.`, () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.scrabble-input').length).toEqual(component.MAX_TILES);
  });

  it(`should focus on first control after component rendered.`, () => {
    fixture.detectChanges();
    component.refocus();
    const compiled = fixture.nativeElement as HTMLElement;
    if(document.activeElement) {
      expect(compiled.querySelectorAll('.scrabble-input').item(0)).toEqual(document.activeElement);
    } else {
      fail('First tile is not focused.');
    }
  });

  it(`should be able to input and clear the tiles`, () => {
    fixture.detectChanges();
    component.refocus();
    component.scrabbleControls[0].patchValue('A');
    expect(component.scrabbleControls[0].value).toEqual('A');
    component.resetTiles();
    expect(component.scrabbleWord()).toEqual('');
  });

  it(`should be able to input form a 'CAT' word from inputs`, () => {
    fixture.detectChanges();
    component.refocus();
    component.scrabbleControls[0].patchValue('C');
    component.scrabbleControls[1].patchValue('A');
    component.scrabbleControls[2].patchValue('T');
    expect(component.scrabbleWord()).toEqual('CAT');
  });

  it(`should calculate correct score from word 'CAT'`, () => {
    fixture.detectChanges();
    component.refocus();
    component.scrabbleControls[0].patchValue('C');
    component.scrabbleControls[1].patchValue('A');
    component.scrabbleControls[2].patchValue('T');
    expect(component.totalScore()).toEqual(5); // C=3, A=1, T=1
  });
});
