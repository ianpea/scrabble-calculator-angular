import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-top-scores',
  templateUrl: './top-scores.component.html',
  styleUrls: ['./top-scores.component.scss']
})
export class TopScoresComponent {
  @Output() close: EventEmitter<string> = new EventEmitter();
  @Input() top: number = 10;
  loading = true;

  constructor (private http: HttpClient) {

  }

  destroy(): void {
    this.close.emit('close');
  }

  topScores(): void {

  }
}
