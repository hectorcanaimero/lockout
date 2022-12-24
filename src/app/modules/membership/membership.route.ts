import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'paid',
    loadChildren: () =>
      import('./pages/paid/paid.module').then( m => m.PaidPageModule)
  }
];


export const memberRoute = RouterModule.forChild(routes);
