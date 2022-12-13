import { createAction, props } from '@ngrx/store';

export interface StatusModel { status: boolean; }

export const loadStatus = createAction( '[STATUS] Load', props< { id: boolean }>() );

export const loadedStatus = createAction( '[STATUS] Success', props<{ status: StatusModel }>() );
