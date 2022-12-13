import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path: 'waiting', loadChildren: () => import('./pages/waiting/waiting.module').then( m => m.WaitingModule) },
];

export const categoriesRoute = RouterModule.forChild(routes);
