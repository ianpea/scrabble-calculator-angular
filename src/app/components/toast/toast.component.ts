import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements AfterViewInit {
  @Input() message: string = "";
  @Input() show: boolean = true;
  @Input() seconds: number = 3;

  @Output() hide: EventEmitter<string> = new EventEmitter<string>();
  hideSequence: any;

  ngAfterViewInit(): void {
    this.hideSequence = setTimeout(() => {
      this.show = false;
      setTimeout(() => {
        this.hide.emit("hide");
      }, 750);
    }, this.seconds * 1000);
  }
}
