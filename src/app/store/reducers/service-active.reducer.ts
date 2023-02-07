import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface ServiceActiveState { items: any[]; loading: boolean; total: number; error: any  };
export const serviceActiveState: ServiceActiveState = { loading: false, items: [], total: 0, error: null };

const serviceActiveReducerMap = createReducer(
  serviceActiveState,
  on(actions.load, (state) => ({ ...state, loading: true })),

  on(actions.success, (state, { items }) => 
    ({ ...state, loading: false, items, total: items.length })),

  on(actions.error, (state, { error }) => ({ ...state, loading: false, error })),
);

export const serviceActiveReduce = (state: any, action: any) => serviceActiveReducerMap(state, action);
