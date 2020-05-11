import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilitiesService } from 'src/app/servicios/utilities.service';
import { AlertController, ModalController } from '@ionic/angular';
//import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireDatabase} from 'angularfire2/database'; 
import * as firebase from 'firebase';

@Component({
  selector: 'app-corroborar',
  templateUrl: './corroborar.component.html',
  styleUrls: ['./corroborar.component.scss'],
})
export class CorroborarComponent implements OnInit {

  constructor( private auth: AngularFireAuth,
    private uti: UtilitiesService,
    private alertController: AlertController,
    private db:AngularFirestore,
    private modalController: ModalController//,
    //private dbR: AngularFireDatabase
    ) { }
    user: firebase.User;
  ngOnInit() {
    this.auth.authState.subscribe(s => this.user = s)
  }

  enviarCorreo() {
    this.auth.auth.currentUser.sendEmailVerification().then(s => {
      this.uti.presentAlert("¡Revisa tu bandeja!", "Por favor, revisa tu correo, hemos enviado un enlace de verificación")
      this.terminar()
    }).catch(e => {
      this.uti.presentAlert("Lo sentimos, no es posible verificar tu correo", "No se ha logrado verificar tu correo")
      this.terminar()
    })
  }

  terminar() {
    this.modalController.dismiss()
  }

  async editar() {
    const alert = await this.alertController.create({
      header: 'Si deseas cambiar tu correo ingresalo ahora',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Correo electrónico',
          value: this.user.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: (r) => {
            console.log('el valor de r email es--->',r.email);
           this.cambiar(r.email)
          }
        }
      ]
    });
    await alert.present();
  }
  
  cambiar(newEmail: string) {
    var user = firebase.auth().currentUser;

    user.updateEmail(newEmail).then(s => {
      this.uti.presentAlert("Correo modificado", "Tu correo se ha modificado, además, hemos enviado un correo para que puedas corroborarlo")
     // this.dbR.database.ref("users").child(this.user.uid).update({ correo: newEmail })
      this.enviarCorreo()
    }).catch(async e => {
      console.log('nel prro--->>');
      /*if (e.code === "auth/requires-recent-login") {
        try {
          console.log("Try to reauthenticate")
         // await this.reautenticar()
          this.cambiar(newEmail)

        } catch (error) {
          console.log("Imposible de cambiar")
        }
      }*/
    })
  }

}
