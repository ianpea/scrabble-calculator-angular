import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrabbleComponent } from './scrabble.component';

describe('ScrabbleComponent', () => {
  let component: ScrabbleComponent;
  let fixture: ComponentFixture<ScrabbleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrabbleComponent]
    });
    fixture = TestBed.createComponent(ScrabbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
