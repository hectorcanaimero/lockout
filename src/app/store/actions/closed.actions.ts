import { createAction, props } from '@ngrx/store';
import { SolicitudModel } from '@core/model/solicitud.interfaces';

export const closedLoad = createAction( '[CLOSED] Load', props<{ id: any }>());

export const closedSuccess = createAction( '[CLOSED] Success', props<{ items: SolicitudModel[]}>() );

export const closedError = createAction( '[CLOSED] Error', props<{ error: any }>() );
