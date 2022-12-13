import { createAction, props } from '@ngrx/store';

export const historyInit=
  createAction( '[HISTORY] Load', props< { id: string }>());

export const historyLoaded =
  createAction( '[HISTORY]  Success', props<{ history: any }>());

export const historyError =
  createAction( '[HISTORY]  Error', props<{ error: any }>() );
