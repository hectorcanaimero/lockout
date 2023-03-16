import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '../actions';
import { MasterService } from '@core/services/master.service';

@Injectable()

export class BannersEffects {
  service$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.bannerLoad),
      mergeMap((action: any) => this.ms.postMaster('banners/company', action.data)
        .pipe(
          map((items) => actions.bannerLoaded({ items })),
          catchError(async ({ error }) => actions.bannerError({ error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ms: MasterService,
  ) {}
}
