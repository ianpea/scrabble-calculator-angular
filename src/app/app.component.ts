import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]

})
export class AppComponent implements OnInit {
  showToast: boolean = false;
  toastMessage: string = "";

  constructor () { }

  ngOnInit(): void {
  }
}
