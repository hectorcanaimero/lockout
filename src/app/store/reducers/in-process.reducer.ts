import { errorInProgress } from '../actions/in-process.actions';
import { createReducer, on } from '@ngrx/store';
import { loadSolicitud, loadedSolicitud, updateSolicitudSuccess } from '../actions';
import { SolicitudModel } from '@core/model/solicitud.interfaces';

export interface SolicitudState { solicitud: SolicitudModel[]; total: number; loading: boolean; error: any; }

export const solicitudState: SolicitudState = { loading: false, solicitud: null, total: 0, error: null };

const _solicitudReducer = createReducer(
  solicitudState,
  on(loadSolicitud, (state, { id }) => ({ ...state, loading: true, id })),

  on(updateSolicitudSuccess, (state,) => ({ ...state, loading: false, })),

  on(loadedSolicitud, (state, { solicitud }) => ({ ...state, loading: false, solicitud, total: solicitud.length })),

  on(errorInProgress, (state, { error }) => ({ ...state, loading: false, error })),
);

export const solicitudReducer = (state: any, action: any) => _solicitudReducer(state, action);
