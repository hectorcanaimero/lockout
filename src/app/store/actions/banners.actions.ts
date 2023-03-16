import { createAction, props } from '@ngrx/store';

export const bannerLoad = createAction(
  '[BANNER] Load', props< { data: any }>()
);

export const bannerLoaded = createAction(
  '[BANNER] Success', props<{ items: any }>()
);

export const bannerError =
  createAction('[BANNER] Error', props<{ error: any }>());
