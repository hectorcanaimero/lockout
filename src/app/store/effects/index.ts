import { ScoreEffects } from './score.effects';
import { ExpertEffects } from './expert.effects';
import { CustomerEffects } from './customer.effects';
import { StripeEffects } from './stripe.effects';
import { ClosedEffects } from './closed.effects';
import { HistoryEffects } from './history.effects';
import { CompanyEffects } from './company.effects';
import { InProcessEffects } from './in-process.effects';
import { PositionEffects } from './position.effects';
import { UserEffects } from './user.effects';

import { ServiceActiveEffects } from './service-active.effects';
import { ServiceAcceptedEffects } from './service-accepted.effects';
import { ServiceFinishedEffects } from './service-finished.effects';
import { ServiceInProcessEffects } from './service-in-process.effects';


export const EffectsArray: any[] = [
  UserEffects,
  ScoreEffects,
  ClosedEffects,
  StripeEffects,
  ExpertEffects,
  CompanyEffects,
  HistoryEffects,
  PositionEffects,
  CustomerEffects,
  InProcessEffects,
  ServiceActiveEffects,
  ServiceAcceptedEffects,
  ServiceFinishedEffects,
  ServiceInProcessEffects,
];
