import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule],
      declarations: [AppComponent]
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }
  );

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
