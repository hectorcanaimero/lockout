import { Routes, RouterModule } from '@angular/router';

const app: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  }

];

export const companiesRoute = RouterModule.forChild(app);
