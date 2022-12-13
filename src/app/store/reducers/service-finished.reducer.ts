import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface ServiceFinishedState { loading: boolean; items: any, error: any; }

export const serviceFinishedState: ServiceFinishedState = { loading: false, items: null, error: null };

const _serviceFinishedReducer = createReducer(
  serviceFinishedState,
  on(actions.finishedInit, (state, { id }) =>
    ({ ...state, loading: true, id })),

  on(actions.finishedLoaded, (state, { items }) =>
    ({ ...state, loading: false, items })),

  on(actions.finishedError, (state, { error }) =>
    ({ ...state, loading: false, error })),
);

export const serviceFinishedReducer =
  (state: any, action: any) => _serviceFinishedReducer(state, action);
