import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaPageRoutingModule } from './busqueda-routing.module';

import { BusquedaPage } from './busqueda.page';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaPageRoutingModule,
     NgAisModule
  ],
  declarations: [BusquedaPage]
})
export class BusquedaPageModule {}
