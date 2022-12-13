import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '../actions/accepted.actions';
import { DbCompaniesService } from '@modules/companies/services/db-companies.service';



@Injectable()
export class AcceptedEffects {
  seervice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccepted),
      mergeMap((action: any) => this.db.getServices(action.id, 'ACCEPTED')
        .pipe(
          map((accepted) => actions.successAccepted({ accepted })),
          catchError(async (error) => actions.errorAccepted({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCompaniesService
  ) {}
}
