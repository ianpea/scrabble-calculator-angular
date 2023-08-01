import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginatorState} from 'primeng/paginator';
import {ScorePage, PageEvent, Score} from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-top-scores',
  templateUrl: './top-scores.component.html',
  styleUrls: ['./top-scores.component.scss']
})
export class TopScoresComponent {
  @Output() close: EventEmitter<string> = new EventEmitter();
  @Input() perPage: number = 10;
  scorePage: ScorePage<Score> | undefined;
  loading = true;
  pageEvent: PageEvent = {
    first: 0,
    rows: 0,
    page: 0,
    pageCount: 0,
    total: 0
  };

  constructor (private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.topScores();
  }

  destroy(): void {
    this.close.emit('close');
    this.close.unsubscribe();
  }

  topScores(): void {
    this.http.get<ScorePage<Score>>("/api/scores/top?perPage=" + this.perPage + "&pageNo=" + (this.pageEvent.page)).subscribe(res => {
      this.scorePage = res;
      this.loading = false;
      this.pageEvent = {
        first: res.from,
        rows: this.perPage,
        page: res.current_page,
        pageCount: res.last_page,
        total: res.total
      };
    });
  }

  pageChange(paginatorState: PaginatorState): void {
    this.pageEvent.page = (paginatorState.page ?? 0) + 1;
    this.topScores();
  }
}
