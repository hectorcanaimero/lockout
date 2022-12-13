import { createAction, props } from '@ngrx/store';
import { SolicitudModel } from '@core/model/solicitud.interfaces';

export const loadSolicitud = createAction( '[IN PROCESS] Load', props< { id: number }>() );

export const loadedSolicitud = createAction( '[IN PROCESS] Success', props<{ solicitud: SolicitudModel[] }>() );


export const updateSolicitud = createAction( '[IN PROCESS]  Update', props<{ id: number, status: string, company: number }>() );

export const updateSolicitudSuccess = createAction( '[IN PROCESS]  Update  Success' );

export const errorInProgress = createAction( '[IN PROCESS] Loaded Error', props<{ error: any }>() );
