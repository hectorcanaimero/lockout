import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface ServiceInProcessState { loading: boolean; items: any, error: any; }

export const serviceInProcessState: ServiceInProcessState = { loading: false, items: null, error: null };

const _serviceInProcessReducer = createReducer(
  serviceInProcessState,
  on(actions.inProcessInit, (state, { id }) =>
    ({ ...state, loading: true, id })),

  on(actions.inProcessLoaded, (state, { items }) =>
    ({ ...state, loading: false, items })),

  on(actions.inProcessError, (state, { error }) =>
    ({ ...state, loading: false, error })),
);

export const serviceInProcessReducer =
  (state: any, action: any) => _serviceInProcessReducer(state, action);
