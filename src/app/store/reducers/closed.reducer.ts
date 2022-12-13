import { closedLoad, closedSuccess, closedError } from './../actions/closed.actions';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { SolicitudModel } from '@core/model/solicitud.interfaces';

export interface ClosedState { items: SolicitudModel[]; loading: boolean; error: any; total: number  };
export const closedState: ClosedState = { loading: false, items: [], error: null, total: 0 };

const closedReducerMap = createReducer(
  closedState,
  on(actions.closedLoad, (state) => ({ ...state, loading: true })),

  on(actions.closedSuccess, (state, { items }) => ({ ...state, loading: false, items, total: items.length })),

  on(actions.closedError, (state, { error }) => ({ ...state, loading: false, error })),
);

export const closedReducer = (state: any, action: any) => closedReducerMap(state, action);
