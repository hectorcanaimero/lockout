
import { createAction, props } from '@ngrx/store';

export const customerLoad    = createAction('[CUSTOMER] Load',   props< { email: string }>() );


export const customerSuccess = createAction('[CUSTOMER] Success', props<{ item: any }>() );

export const customerError   = createAction('[CUSTOMER] Error', props<{ error: any }>() );
