import { createReducer, on } from '@ngrx/store';
import * as actions from '@store/actions';

export interface CompanyState { company: {}; loading: boolean; error: any  };
export const companyState: CompanyState = { loading: false, company: {}, error: null  };

const _companyReducer = createReducer(
  companyState,
  on(actions.loadCompany, (state, { user }) =>
    ({ ...state, loading: true, user })),

  on(actions.updateCompany, (state, { user, data }) =>
    ({ ...state, loading: true, user, data })),

  on(actions.loadedCompany, (state, { company }) => ({ ...state, loading: false, company })),
);

export const companyReducer = (state: any, action: any) => _companyReducer(state, action);
