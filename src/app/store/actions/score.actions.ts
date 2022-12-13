import { createAction, props } from '@ngrx/store';

export const initScore =
  createAction( '[SCORE] Load', props<{ user: string}>() );

export const loadedScore =
  createAction( '[SCORE] Loaded', props<{ item: any}>() );

export const errorScore =
  createAction( '[SCORE] Error', props<{ error: any }>() );
