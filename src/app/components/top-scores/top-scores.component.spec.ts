import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopScoresComponent} from './top-scores.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

describe('TopScoresComponent', () => {
  let component: TopScoresComponent;
  let fixture: ComponentFixture<TopScoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopScoresComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [MessageService, DialogService]
    });
    fixture = TestBed.createComponent(TopScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have total value as 10', () => {
    expect(component.total).toEqual(10);
  });

  it('should load when created', () => {
    expect(component.loading).toEqual(true);
  });
});
