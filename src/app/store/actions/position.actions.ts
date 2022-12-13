import { createAction, props } from '@ngrx/store';

export const positionLoad = createAction(   '[POSITION] Load');
export const positionLoaded = createAction( '[POSITION] Loaded', props< { position: any }>() );
