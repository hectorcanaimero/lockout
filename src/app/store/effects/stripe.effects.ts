import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '../actions';
import { MemberService } from '@modules/membership/services/membership.service';



@Injectable()
export class StripeEffects {
  service$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.stripeLoad),
    mergeMap((action: any) => this.db.getSubscription(action.uid)
      .pipe(
        map((item) => actions.stripeSuccess({ item })),
        catchError(async (error) => actions.stripeError({ error }))
      )
    )
  )
  );
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.stripeCreate),
      mergeMap((action: any) => this.db.createSubscription(action.data)
        .pipe(
          map((item) =>{
            return  actions.stripeSuccess({ item });
          }),
          catchError(async (error) => actions.stripeError({ error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private db: MemberService
  ) {}
}
