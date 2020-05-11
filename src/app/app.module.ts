import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { firebaseConfig} from '../environments/environment';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';

import {FormsModule} from '@angular/forms';

import {CorroborarComponent} from '../app/componentes/corroborar/corroborar.component';
//ngx-translate
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { LanguagePopoverPageModule } from './language-popover/language-popover.module';
//import {NgAisModule} from 'angular-instantsearch';
import { NgAisModule } from 'angular-instantsearch';


export function createTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,CorroborarComponent],
  entryComponents: [CorroborarComponent],
  imports: [FormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule,
    AngularFirestoreModule,AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    NgAisModule.forRoot()
   // NgAisModule
  //  LanguagePopoverPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: FirestoreSettingsToken, useValue: {}}
    //LanguagePopoverPageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
