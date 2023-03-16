import { createReducer, on } from '@ngrx/store';
import * as actions from '@store/actions';

export interface CompanyState { company: object; loading: boolean; error: any  };
export const companyState: CompanyState = { loading: false, company: null, error: null  };

const _companyReducer = createReducer(
  companyState,
  on(actions.loadCompany, (state, { user }) =>
    ({ ...state, loading: true, user })),

  on(actions.updateCompany, (state, { user, data }) =>
    ({ ...state, loading: false, user, data })),

  on(actions.loadedCompany, (state, { company }) => 
    ({ ...state, loading: false, company })),

  on(actions.loadedCompanyError, (state, { error }) => 
    ({ ...state, loading: false, error })),

);

export const companyReducer = (state: any, action: any) => _companyReducer(state, action);
