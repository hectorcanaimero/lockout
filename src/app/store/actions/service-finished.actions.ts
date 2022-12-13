import { createAction, props } from '@ngrx/store';

export const finishedInit =
  createAction( '[SERVICE] Finished Load', props<{ id: string }>());

export const finishedLoaded =
  createAction( '[SERVICE] Finished Loaded', props<{ items: any }>());

export const finishedError =
  createAction( '[SERVICE] InProcess Error', props<{ error: any }>());
