import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface StripeState { item: any; loading: boolean; uid: string, error: any, data: any  };
export const stripeState: StripeState = { loading: false, item: null, uid: null, error: null, data:null };

const stripeReducerMap = createReducer(
  stripeState,
  on(actions.stripeLoad, (state, { uid }) => ({ ...state, loading: true, uid })),

  on(actions.stripeCreate, (state, { data }) => ({ ...state, loading: true, data })),

  on(actions.stripeSuccess, (state, { item }) => ({ ...state, loading: false, item })),

  on(actions.stripeError, (state, { error }) => ({ ...state, loading: false, error })),
);

export const stripeReducer = (state: any, action: any) => stripeReducerMap(state, action);
