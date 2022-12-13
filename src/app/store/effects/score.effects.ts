import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '../actions';

@Injectable()
export class ScoreEffects {
  service$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.initScore),
      mergeMap((action: any) => this.getScore(action.user)
        .pipe(
          map(item => actions.loadedScore({ item })),
          catchError(async ({ error }) => actions.errorScore({ error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ms: MasterService
  ) {}

  getScore(user) {
    return this.ms.getMaster(`comments/score/company/${user}`);
  }
}
