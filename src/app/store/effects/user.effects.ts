import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError } from 'rxjs/operators';
import * as actions from '@store/actions';
import { EMPTY } from 'rxjs';



@Injectable()
export class UserEffects {
  seervice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadUser),
      map((user: any) => actions.loadedUser({ user })),
      catchError(() => EMPTY)
    )
  );
  constructor(
    private actions$: Actions,
  ) {}
}
