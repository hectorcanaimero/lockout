import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface HistoryState { history: any; loading: boolean; error: any}

export const historyState: HistoryState = { loading: false, history: null, error: null, };

const _historyReducer = createReducer(
  historyState,
  on(actions.historyInit, (state, { id }) =>
    ({ ...state, loading: true, id })),

  on(actions.historyLoaded, (state, { history }) =>
    ({ ...state, loading: false, history })),

    on(actions.historyError, (state, { error }) =>
    ({ ...state, loading: false, error })),
);

export const historyReducer = (state: any, action: any) => _historyReducer(state, action);
