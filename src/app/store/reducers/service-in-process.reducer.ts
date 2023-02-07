import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface ServiceInProcessState { 
  loading: boolean; 
  items: any, 
  total: number, 
  error: any; 
}

export const serviceInProcessState: ServiceInProcessState = { 
  loading: false, 
  items: null, 
  total: 0, 
  error: null
};

const _serviceInProcessReducer = createReducer(
  serviceInProcessState,
  on(actions.inProcessInit, (state, { id }) =>
    ({ ...state, loading: true, id })),

  on(actions.inProcessLoaded, (state, { items }) =>
    ({ ...state, loading: false, items, total: items.length })),

  on(actions.inProcessError, (state, { error }) =>
    ({ ...state, loading: false, error })),
);

export const serviceInProcessReducer =
  (state: any, action: any) => _serviceInProcessReducer(state, action);
