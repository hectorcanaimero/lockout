import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface ScoreState { item: any; loading: boolean; error: any  };
export const scoreState: ScoreState = { loading: false, item: null, error: null };

const scoreReducerMap = createReducer(
  scoreState,
  on(actions.initScore, (state, { user }) =>
    ({ ...state, loading: true, user })),

  on(actions.loadedScore, (state, { item }) =>
    ({ ...state, loading: false, item })),

  on(actions.errorScore, (state, { error }) =>
    ({ ...state, loading: false, error })),
);

export const scoreReducer = (state: any, action: any) =>
  scoreReducerMap(state, action);
