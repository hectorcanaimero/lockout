import { createReducer, on } from '@ngrx/store';
import { StatusModel, loadedStatus, loadStatus } from '../actions/status.actions';

export interface StatusState {
  status: StatusModel;
  loading: boolean;
}

export const statusState: StatusState = {
  status: null,
  loading: false,
};

const _statusReducer = createReducer(
  statusState,
  on(loadStatus, (state, { id }) => ({ ...state, loading: true, id })),
  on(loadedStatus, (state, { status }) => ({ ...state, loading: false, status })),
);

export const statusReducer = (state: any, action: any) => _statusReducer(state, action);
