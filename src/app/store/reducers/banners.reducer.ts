import { createReducer, on } from '@ngrx/store';
import { bannerLoad, bannerLoaded, bannerError } from '../actions';

export interface BannerState { items: any; loading: boolean };

export const bannerState: BannerState = { loading: false, items: null };

const bannerStateMap = createReducer(
  bannerState,
  on(bannerLoad, (state, { data }) => ({ ...state, loading: true, data })),

  on(bannerLoaded, (state, { items }) => ({ ...state, loading: false, items })),

  on(bannerError, (state, { error }) => ({ ...state, loading: false, error })),

);

export const bannerReducer = (state: any, action: any) => bannerStateMap(state, action);
