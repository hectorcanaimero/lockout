import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '../actions';
import { MasterService } from '@core/services/master.service';


@Injectable()
export class ServiceAcceptedEffects {
  inProcess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.acceptedInit),
      mergeMap((action: any) => this.getInProcess(action.id)
        .pipe(
          map((items) => actions.acceptedLoaded({ items })),
          catchError(async (error) => actions.acceptedError({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private ms: MasterService,
  ) {}

  getInProcess(company: string) {
    return this.ms.getMaster(`services/company/accepted/${company}`);
  }
}
