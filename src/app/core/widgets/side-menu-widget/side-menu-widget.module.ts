import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuWidgetComponent } from '@core/widgets/side-menu-widget/side-menu-widget.component';



@NgModule({
  exports: [SideMenuWidgetComponent],
  declarations: [SideMenuWidgetComponent],
  entryComponents: [SideMenuWidgetComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ]
})
export class SideMenuWidgetModule { }
