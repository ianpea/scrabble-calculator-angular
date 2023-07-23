import {TestBed} from '@angular/core/testing';

import {ErrorInterceptor} from './error.interceptor';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

describe('ErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorInterceptor, MessageService, DialogService
    ],
    imports: [HttpClientTestingModule, ReactiveFormsModule],
  }));

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
