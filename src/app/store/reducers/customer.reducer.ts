import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface CustomerState { item: any; loading: boolean; email: string, error: any  };
export const customerState: CustomerState = { loading: false, item: null, email: null, error: null };

const customerReducerMap = createReducer(
  customerState,
  on(actions.customerLoad, (state) => ({ ...state, loading: true })),

  on(actions.customerSuccess, (state, { item }) => ({ ...state, loading: false, item })),

  on(actions.customerError, (state, { error }) => ({ ...state, loading: false, error })),
);

export const customerReducer = (state: any, action: any) => customerReducerMap(state, action);
