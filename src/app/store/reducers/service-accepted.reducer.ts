import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface ServiceAcceptedState { loading: boolean; items: any, error: any; }

export const serviceAcceptedState: ServiceAcceptedState = { loading: false, items: null, error: null };

const _serviceAcceptedReducer = createReducer(
  serviceAcceptedState,
  on(actions.acceptedInit, (state, { id }) =>
    ({ ...state, loading: true, id })),

  on(actions.acceptedLoaded, (state, { items }) =>
    ({ ...state, loading: false, items })),

  on(actions.acceptedError, (state, { error }) =>
    ({ ...state, loading: false, error })),
);

export const serviceAcceptedReducer =
  (state: any, action: any) => _serviceAcceptedReducer(state, action);
