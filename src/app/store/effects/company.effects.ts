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
      mergeMap(({ user }) => this.db.getCompany(user)
        .pipe(
          tap((res) => this.getRoutes(res)),
          map((company: any) => actions.loadedCompany({ company })),
          catchError(async ({ error }: any) => actions.loadedCompanyError({ error }))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateCompany),
      mergeMap(({ data, user }) =>this.db.updateCompany(user, {status: data})
        .pipe(
          map((company: any) => actions.loadedCompany({ company })),
          catchError(async ({ error }) => actions.loadedCompanyError({ error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private uService: UtilsService,
    private db: DbCompaniesService,
  ) {}

  private getRoutes(res: any) {
    if (res) {
      this.uService.navigate('pages/home');
    } else {
      this.uService.navigate('register-company');
    }
  }
}
