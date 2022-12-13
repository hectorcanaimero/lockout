import { createAction, props } from '@ngrx/store';

export const expertLoad = createAction( '[EXPERTS] Load' );

export const expertSuccess = createAction('[EXPERTS]  Success', props<{ items: any }>());
