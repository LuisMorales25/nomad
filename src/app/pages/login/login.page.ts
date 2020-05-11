import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguajeService} from '../../servicios/languaje.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  languages = [];
  selected = '';
  constructor(private route:Router,private translate: TranslateService,
    private languageService: LanguajeService,private alertController: AlertController,
    private change: ChangeDetectorRef) { }

  ngOnInit() {
  }

  registro(){
    this.route.navigate(['/registro']);
  }

  ionViewDidEnter() {
    this.languages = this.languageService.getLenguages();
    this.setChecked();
    this.change.detectChanges();
    this.presentAlertRadio();
  }

  mapas(){
    this.route.navigate(['/continent']);
    //this.route.navigate(['/busqueda']);
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Seleccione un idioma',//this.translate.instant('LANGUAGEMODAL.Title'),
      inputs: this.languages,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data:string = 'es 1') => {
            let lista : any = data.split(" ");
            lista[1] = parseInt(lista[1]);
            this.select(lista[0], lista[1])
          }
        }
      ]
    });

    await alert.present();
  }

  select(lng, index){
    this.languageService.setLanguage(lng, index);
  }

  setChecked(){
    this.selected = this.languageService.selected;
    this.languages.forEach((e: any) => {
      let lista = e.value.split(" ");
      if(lista[0] == this.selected){
        e.checked = true; 
      }
    });
  }

}
