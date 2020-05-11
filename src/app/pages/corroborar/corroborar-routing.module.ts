import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorroborarPage } from './corroborar.page';

const routes: Routes = [
  {
    path: '',
    component: CorroborarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorroborarPageRoutingModule {}
