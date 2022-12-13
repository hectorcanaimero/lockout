import { createAction, props } from '@ngrx/store';

export const acceptedInit =
  createAction( '[SERVICE] Accepted Load', props<{ id: string }>());

export const acceptedLoaded =
  createAction( '[SERVICE] Accepted Loaded', props<{ items: any }>());

export const acceptedError =
  createAction( '[SERVICE] Accepted Error', props<{ error: any }>());
