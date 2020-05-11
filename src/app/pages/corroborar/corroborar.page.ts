import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilitiesService } from 'src/app/servicios/utilities.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-corroborar',
  templateUrl: './corroborar.page.html',
  styleUrls: ['./corroborar.page.scss'],
})
export class CorroborarPage implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private uti: UtilitiesService,
    private alertController: AlertController,
    private dbR: AngularFireDatabase,
    private modalController: ModalController
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
            this.cambiar(r.email)
          }
        }
      ]
    });
    await alert.present();
  }
  cambiar(newEmail: string) {
    this.user.updateEmail(newEmail).then(s => {
      this.uti.presentAlert("Correo modificado", "Tu correo se ha modificado, además, hemos enviado un correo para que puedas corroborarlo")
      this.dbR.database.ref("users").child(this.user.uid).update({ correo: newEmail })
      this.enviarCorreo()
    }).catch(async e => {
      if (e.code === "auth/requires-recent-login") {
        try {
          console.log("Try to reauthenticate")
         // await this.reautenticar()
          this.cambiar(newEmail)

        } catch (error) {
          console.log("Imposible de cambiar")
        }
      }
    })
  }

}
