import { ServiceAcceptedEffects } from './effects/service-accepted.effects';
/* eslint-disable @typescript-eslint/naming-convention */
import { ActionReducerMap } from '@ngrx/store';
import * as reducers from 'src/app/store/reducers';


export interface AppState {
  user: reducers.UserState;
  closed: reducers.ClosedState;
  status: reducers.StatusState;
  expert: reducers.ExpertState;
  stripe: reducers.StripeState;
  company: reducers.CompanyState;
  history: reducers.HistoryState;
  customer: reducers.CustomerState;
  position: reducers.PositionState;
  solicitud: reducers.SolicitudState;
  serviceActive: reducers.ServiceActiveState;
  serviceAccepted: reducers.ServiceAcceptedState;
  serviceFinished: reducers.ServiceFinishedState;
  serviceInProcess: reducers.ServiceInProcessState;
  score: reducers.ScoreState;
  banner: reducers.BannerState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  user: reducers.userReducer,
  closed: reducers.closedReducer,
  status: reducers.statusReducer,
  expert: reducers.expertReducer,
  stripe: reducers.stripeReducer,
  company: reducers.companyReducer,
  history: reducers.historyReducer,
  customer: reducers.customerReducer,
  position: reducers.positionReducer,
  solicitud: reducers.solicitudReducer,
  serviceActive: reducers.serviceActiveReduce,
  serviceAccepted: reducers.serviceAcceptedReducer,
  serviceFinished: reducers.serviceFinishedReducer,
  serviceInProcess: reducers.serviceInProcessReducer,
  score: reducers.scoreReducer,
  banner: reducers.bannerReducer,
};
