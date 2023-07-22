import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Toast} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastStatus: Subject<Toast> = new Subject();

  constructor () { }
}
