import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { memberRoute } from '@modules/membership/membership.route';



@NgModule({
  declarations: [],
  imports: [
    memberRoute,
    IonicModule,
    CommonModule,
  ]
})
export class MembershipModule { }
