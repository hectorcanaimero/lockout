import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '../actions';
import { MemberService } from '@modules/membership/services/membership.service';



@Injectable()
export class CustomerEffects {
  service$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.customerLoad),
    mergeMap((action: any) => this.db.getCustomerByEmail(action.email)
      .pipe(
        map((item) => actions.customerSuccess({ item })),
        catchError(async (error) => actions.customerError({ error }))
      )
    )
  )
  );

  constructor(
    private actions$: Actions,
    private db: MemberService
  ) {}
}
