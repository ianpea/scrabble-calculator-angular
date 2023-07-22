import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LaravelPage, Score} from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-top-scores',
  templateUrl: './top-scores.component.html',
  styleUrls: ['./top-scores.component.scss']
})
export class TopScoresComponent implements OnInit {
  @Output() close: EventEmitter<string> = new EventEmitter();
  @Input() total: number = 10;
  scorePage: LaravelPage<Score> | undefined;
  loading = true;

  constructor (private http: HttpClient) {

  }
  ngOnInit(): void {
    this.topScores();
  }

  destroy(): void {
    this.close.emit('close');
  }

  topScores(): void {
    this.http.get<LaravelPage<Score>>("/api/scores/top/" + this.total).subscribe(res => {
      this.scorePage = res;
      this.loading = false;
    });
  }
}
