import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsChatPage } from './rooms.page';

const routes: Routes = [
  { path: ':uid', component: RoomsChatPage }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class RoomsChatPageRoutingModule {}
