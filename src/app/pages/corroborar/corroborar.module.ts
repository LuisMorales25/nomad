import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorroborarPageRoutingModule } from './corroborar-routing.module';

import { CorroborarPage } from './corroborar.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorroborarPageRoutingModule
  ],
  declarations: [CorroborarPage]
})
export class CorroborarPageModule {}
