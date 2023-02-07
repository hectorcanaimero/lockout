import { createAction, props } from '@ngrx/store';

export const load = createAction(
  '[SERVICE ACTIVE] Load Services Active', props< { company: string }>() );

export const success = createAction(
  '[SERVICE ACTIVE] Loaded Services Active', props<{ items: any[]}>()
);

export const error = createAction(
  '[SERVICE ACTIVE] Loaded Error', props<{ error: any }>()
);
