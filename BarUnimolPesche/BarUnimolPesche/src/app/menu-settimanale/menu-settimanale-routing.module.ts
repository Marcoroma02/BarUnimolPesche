import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuSettimanalePage } from './menu-settimanale.page';

const routes: Routes = [
  {
    path: '',
    component: MenuSettimanalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuSettimanalePageRoutingModule {}
