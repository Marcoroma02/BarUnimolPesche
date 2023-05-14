import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrenotaPranzoPagePageRoutingModule } from './prenota-pranzo-page-routing.module';

import { PrenotaPranzoPagePage } from './prenota-pranzo-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrenotaPranzoPagePageRoutingModule
  ],
  declarations: [PrenotaPranzoPagePage]
})
export class PrenotaPranzoPagePageModule {}
