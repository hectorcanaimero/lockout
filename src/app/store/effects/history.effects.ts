import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { HistoryService } from '@modules/history/services/history.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/history.actions';

@Injectable()
export class HistoryEffects {
  history$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.historyInit),
      mergeMap((action: any) => this.getData(action.id)
        .pipe(
          map((history) => actions.historyLoaded({ history })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ms: MasterService
  ) {}

  getData(company: string) {
    return this.ms.getMaster(`services/company/history/${company}`);
  }

}
