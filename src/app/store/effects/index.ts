import { ScoreEffects } from './score.effects';
import { ExpertEffects } from './expert.effects';
import { CustomerEffects } from './customer.effects';
import { StripeEffects } from './stripe.effects';
import { ClosedEffects } from './closed.effects';
import { AcceptedEffects } from './accepted.effects';
import { HistoryEffects } from './history.effects';
import { CompanyEffects } from './company.effects';
import { InProcessEffects } from './in-process.effects';
import { PositionEffects } from './position.effects';
import { UserEffects } from './user.effects';

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
  AcceptedEffects,
  PositionEffects,
  CustomerEffects,
  InProcessEffects,
  ServiceAcceptedEffects,
  ServiceFinishedEffects,
  ServiceInProcessEffects,
];
