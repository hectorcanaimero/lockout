import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-on-off-widget',
  templateUrl: './on-off-widget.component.html',
  styleUrls: ['./on-off-widget.component.scss'],
})
export class OnOffWidgetComponent implements AfterViewInit {

  online = false;
  onLine$!: Observable<boolean>;


  constructor(
    private store: Store<AppState>,
  ) { }

  ngAfterViewInit(): void {
    this.onLine$ = this.store.select('company')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.company.status)
    );
  }

}
