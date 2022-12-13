import { Routes, RouterModule } from '@angular/router';
import { PagesPage } from '@pages/pages.page';


const routes: Routes = [
  {
    path: '', component: PagesPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('@modules/menu/pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('@modules/services/pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('@modules/history/pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('@modules/chat/chat.module').then( m => m.ChatModule)
      },
      {
        path: 'companies',
        loadChildren: () => import('@modules/companies/pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'membership',
        loadChildren: () => import('@modules/membership/membership.module').then( m => m.MembershipModule)
      },
      { path: '', redirectTo: '/pages/home', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: '/pages/home', pathMatch: 'full' }
];

export const pageRoute = RouterModule.forChild(routes);
