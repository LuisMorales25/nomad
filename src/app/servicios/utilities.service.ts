import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController) { }

  presentAlert(header: string, message: string, boton?: string): Promise<boolean> {
    return new Promise((res, rej) => {
      this.alertController.create({
        header,
        message,
        buttons: [{
          text: boton || "Aceptar",
          handler: () => {
            res(true)
          }
        }]
      }).then(alert => {
        alert.present()
      })
    });
  }

  presentAlertConfirm(header: string, message: string): Promise<boolean> {
    return new Promise((res, rej) => {
      this.alertController.create({
        header: header,
        message: message,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { res(false) }
        }, {
          text: 'Aceptar',
          handler: () => { res(true) }
        }]
      }).then(a => a.present())
    });
  }
  async presentToast(duration?: number, text?: string): Promise<HTMLIonToastElement> {
    return new Promise(async (res, rej) => {
      const toast = await this.toastController.create({
        message: text || "Por favor, espere",
        duration: duration || 2000
      });
      toast.present();
      res(toast)
    });
  }

  errorAuth(e: any) {
    let errorCode = e.code, mensaje = "Algo ha salido mal";
    switch (errorCode) {
      case "auth/claims-too-large":
        mensaje = "El reclamo es muy grande para ser guardado.";
        break;
      case "auth/invalid-argument":
        mensaje =
          "Se proporcionó un argumento no válido para el método de autenticación.";
        break;
      case "auth/invalid-display-name":
        mensaje = "El nombre del usuario no está permitido.";
        break;
      case "auth/invalid-email-verified":
        mensaje =
          "El valor que se proporcionó para la propiedad de usuario emailVerified no es válido.";
        break;
      case "auth/invalid-email":
        mensaje = "El correo ingresado es incorrecto.";
        break;
      case "auth/invalid-password":
        mensaje = "La contraseña proporcionada es incorrecto.";
        break;
      case "auth/invalid-photo-url":
        mensaje = "La fotografía proporcionada es incorrecto.";
        break;
      case "auth/missing-uid":
        mensaje = "El UID no ha sido proporcionado.";
        break;
      case "auth/invalid-uid":
        mensaje = "El UID proporcionado es incorrecto.";
        break;
      case "auth/uid-alread-exists":
        mensaje = "Ya existe un usuario con ese Free Monkey ID.";
        break;
      case "auth/email-already-exists":
        mensaje = "El correo electrónico ya existe.";
        break;
      case "auth/user-not-found":
        mensaje = "El usuario no se ha encontrado.";
        break;
      case "auth/internal-error":
        mensaje = "Un error con el servidor se ha encontrado.";
        break;
      case "auth/wrong-password":
        mensaje =
          "La contraseña no es válida o el usuario no tiene una contraseña.";
        break;
      case "auth/uid-already-exists":
        mensaje = "El Free Monkey ID ya ha sido tomado, por favor, usa otro."
        break;
    }
    console.log(e)
    this.presentAlert("Error", mensaje)
  }
}
