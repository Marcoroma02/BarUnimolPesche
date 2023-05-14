import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuSettimanalePageRoutingModule } from './menu-settimanale-routing.module';

import { MenuSettimanalePage } from './menu-settimanale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuSettimanalePageRoutingModule
  ],
  declarations: [MenuSettimanalePage]
})
export class MenuSettimanalePageModule {}
