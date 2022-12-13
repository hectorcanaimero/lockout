import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import * as actions from '../actions';
import { DbCompaniesService } from '@modules/companies/services/db-companies.service';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';

@Injectable()
export class InProcessEffects {
  solicitud$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSolicitud),
      mergeMap((action: any) => this.db.getServices(action.id, 'IN_PROCESS')
        .pipe(
          map((solicitud) => actions.loadedSolicitud({ solicitud })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateSolicitud$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateSolicitud),
      mergeMap(({ id, status, company }) => this.dbCat.statusService(id, status, company)
        .pipe(
          map(() => actions.updateSolicitudSuccess()),
          catchError(() => EMPTY)
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCompaniesService,
    private dbCat: DbCategoriesService,
  ) {}

}
