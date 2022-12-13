import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';

import * as actions from '../actions/company.actions';
import { UtilsService } from '@core/services/utils.service';
import { DbCompaniesService } from '@modules/companies/services/db-companies.service';

@Injectable()
export class CompanyEffects {
  company$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadCompany),
      mergeMap((action) => this.db.getCompany(action.user)
        .pipe(
          tap((res) => {
            if (res) {
              this.uService.navigate('pages/home');
            } else {
              this.uService.navigate('register-company');
            }
          }),
          map((company: any) => {
            return actions.loadedCompany({ company })
          }),
          catchError(async ({ error }: any) => {
            return actions.loadedCompanyError({ error });
          })
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateCompany),
      mergeMap((action) =>
        this.db.updateCompany(action.user, {status: action.data})
        .pipe(
          map((company: any) => actions.loadedCompany({ company })),
          catchError(async ({ error }) => {
            console.log(error);
            return actions.loadedCompanyError({ error });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private uService: UtilsService,
    private db: DbCompaniesService,
  ) {}
}
