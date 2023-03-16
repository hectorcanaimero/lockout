import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { filter, map, Observable, of, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-on-off-widget',
  templateUrl: './on-off-widget.component.html',
  styleUrls: ['./on-off-widget.component.scss'],
})
export class OnOffWidgetComponent implements OnInit {

  online = false;
  item$!: Observable<boolean>;


  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.item$ = this.store.select('company')
    .pipe(
      filter(({ loading }) => !loading),
      map(({ company }: any) => 
        company ? company.status : of(false))
    );
  }

}
