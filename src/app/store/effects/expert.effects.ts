import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actions from '../actions';
import { MasterService } from '@core/services/master.service';

@Injectable()
export class ExpertEffects {

  constructor(
    private actions$: Actions,
    private ms: MasterService
  ) {}

  expert$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.expertLoad),
    mergeMap(() => this.ms.getMaster('tables/categories')
      .pipe(
        map((items) => actions.expertSuccess({ items })),
        catchError(() => EMPTY)
      )
    )
  )
);
}
