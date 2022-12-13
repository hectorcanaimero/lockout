import { createAction, props } from '@ngrx/store';

export const stripeLoad    = createAction('[SUBSCRIPTION] Load',   props< { uid: any }>() );

export const stripeCreate = createAction('[SUBSCRIPTION] Create', props<{ data: any }>() );

export const stripeSuccess = createAction('[SUBSCRIPTION] Success', props<{ item: any }>() );

export const stripeError   = createAction('[SUBSCRIPTION] Error', props<{ error: any }>() );
