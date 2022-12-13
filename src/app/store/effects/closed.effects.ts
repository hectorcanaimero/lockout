import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '@store/actions';
import { DbCompaniesService } from '@modules/companies/services/db-companies.service';



@Injectable()
export class ClosedEffects {
  service$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.closedLoad),
      mergeMap((action: any) => this.db.getServices(action.id, 'CLOSED')
        .pipe(
          map((items) => actions.closedSuccess({ items })),
          catchError(async (error) => actions.closedError({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCompaniesService
  ) {}
}
