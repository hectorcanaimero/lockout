import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/accepted.actions';
import { SolicitudModel } from '@core/model/solicitud.interfaces';

export interface AcceptedState { accepted: SolicitudModel[]; loading: boolean; total: number; error: any  };
export const acceptedState: AcceptedState = { loading: false, accepted: [], total: 0, error: null };

const acceptedReducerMap = createReducer(
  acceptedState,
  on(actions.loadAccepted, (state) => ({ ...state, loading: true })),

  on(actions.successAccepted, (state, { accepted }) => ({ ...state, loading: false, accepted, total: accepted.length })),

  on(actions.errorAccepted, (state, { error }) => ({ ...state, loading: false, error })),
);

export const acceptedReducer = (state: any, action: any) => acceptedReducerMap(state, action);
