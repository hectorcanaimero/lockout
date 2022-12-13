import { createAction, props } from '@ngrx/store';

export const inProcessInit =
  createAction( '[SERVICE] InProcess Load', props<{ id: string }>());

export const inProcessLoaded =
  createAction( '[SERVICE] InProcess Loaded', props<{ items: any }>());

export const inProcessError =
  createAction( '[SERVICE] InProcess Error', props<{ error: any }>());
