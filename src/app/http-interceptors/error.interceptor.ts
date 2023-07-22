import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap, } from 'rxjs';
import {MessageService} from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor (public messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
      {
        next: (event: any) => {
          return event;
        },
        error: (error: HttpErrorResponse) => {
          if(error.status.toString().startsWith('5')) {
            console.log(error.status.toString());
            console.log(this.messageService);
            this.messageService.add({severity: 'error', key: 'main', summary: "Connection Error.", detail: "Server may be down, please contact administrator."});
          }
        }
      })
    );
  }
}
