import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@modules/users/services/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/home',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('@modules/users/users.module').then( m => m.UsersModule)
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: () => import('@modules/chat/chat.module').then( m => m.ChatModule)
  },
  {
    path: 'register-company',
    canActivate: [AuthGuard],
    loadChildren: () => import('@modules/companies/pages/register/register.module').then( m => m.RegisterCompanyPageModule)
  },
  {
    path: 'register-mapa',
    canActivate: [AuthGuard],
    loadChildren: () => import('@modules/companies/widgets/maps/maps.module').then( m => m.MapsUserWidgetModule)
  },
  {
    path: 'membership',
    canActivate: [AuthGuard],
    loadChildren: () => import('@modules/membership/membership.module').then( m => m.MembershipModule)
  },

];


export const appRoute = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
