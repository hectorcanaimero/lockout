import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { UserModel } from '@core/model/user.interface';

export interface PositionState { position: any; loading: boolean; }

export const positionState: PositionState = { loading: false, position: null };

const positionReducerMap = createReducer(
  positionState,
  on(actions.positionLoad, (state, { }) =>
    ({ ...state, loading: true })),

  on(actions.positionLoaded, (state, { position }) =>
    ({ ...state, loading: true, position })),

);

export const positionReducer = (state: any, action: any) =>
  positionReducerMap(state, action);
