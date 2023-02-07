import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/service-active.actions';
import { MasterService } from '@core/services/master.service';



@Injectable()
export class ServiceActiveEffects {
  seervice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.load),
      mergeMap((action: any) => this.getServices(action.company)
        .pipe(
          map((items) => actions.success({ items })),
          catchError(async (error) => actions.error({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private ms: MasterService
  ) {}

  getServices(company: string) {
    return this.ms.getMaster(`services/active/${company}`)
  }
}
