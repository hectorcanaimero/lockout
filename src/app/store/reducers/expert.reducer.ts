import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface ExpertState { items: any; loading: boolean; }

export const expertState: ExpertState = { loading: false, items: null };

const _expertReducer = createReducer(
  expertState,
  on(actions.expertLoad, (state) => ({ ...state, loading: true })),

  on(actions.expertSuccess, (state, { items }) => ({ ...state, loading: false, items })),
);

export const expertReducer = (state: any, action: any) => _expertReducer(state, action);
