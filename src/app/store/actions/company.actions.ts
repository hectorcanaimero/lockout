import { createAction, props } from '@ngrx/store';
import { ErrorModel } from '@core/model/error.interface';
import { CompanyModel } from '@core/model/company.interfaces';

export const loadCompany = createAction(
  '[COMPANY] Load', props<{ user: string }>() );

export const loadedCompany = createAction(
  '[COMPANY] Success', props<{ company: CompanyModel[] }>()
);

export const updateCompany = createAction(
  '[COMPANY] Update', props<{ user: string, data: any }>() );

export const loadedCompanyError = createAction(
  '[COMPANY] Error', props<{ error: any }>()
);
