import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrenotaPranzoPagePage } from './prenota-pranzo-page.page';

const routes: Routes = [
  {
    path: '',
    component: PrenotaPranzoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrenotaPranzoPagePageRoutingModule {}
