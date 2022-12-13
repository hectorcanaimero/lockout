import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '@store/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit {

  company$: Observable<object|any>;
  user$: Observable<object|any>;
  user: object|any;
  score$: Observable<object|any>;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngAfterViewInit(): void {
    this.getData();
  }

  getData(): void {
    this.company$ = this.store.select('company')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.company)
    );

    this.score$ = this.store.select('score')
    .pipe(
      filter(row => !row.loading),
      map(({ item }: any) => item)
    );
  }
}
