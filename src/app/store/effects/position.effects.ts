
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actions from '../actions';
import { Geolocation } from '@capacitor/geolocation';


@Injectable()
export class PositionEffects {
  position$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.positionLoad),
      mergeMap((action: any) => this.currentLocation()
        .pipe(
          map(({ coords }) => {
            const position = { lat: coords.latitude, lng: coords.longitude };
            return actions.positionLoaded({ position })
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
  ) {}

    currentLocation = () =>
      from(Geolocation.getCurrentPosition());
}
