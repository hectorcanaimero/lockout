import { createAction, props } from '@ngrx/store';
import { SolicitudModel } from '@core/model/solicitud.interfaces';

export const loadAccepted = createAction( '[ACCEPTED] Load',   props< { id: number }>() );

export const successAccepted = createAction(
  '[ACCEPTED] Loaded Success', props<{ accepted: SolicitudModel[]}>()
);

export const errorAccepted = createAction(
  '[ACCEPTED] Loaded Error', props<{ error: any }>()
);
