import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { promise } from 'protractor';
import {Router, Route} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UtilitiesService } from './utilities.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private AFauth:AngularFireAuth, private router:Router, 
    private db:AngularFirestore,private uti: UtilitiesService,
    //private dbR: AngularFireDatabase
    ) { }

  registrarse(email:string, password:string, name:string){
    return new Promise((resolve,reject)=>{
      
      this.AFauth.auth.createUserWithEmailAndPassword(email,password).then(res=>{
          console.log('los datos de usuario son--->',res);
          this.enviarCorreo();
          console.log('el uid es--->',res.user.uid);
          const uid=res.user.uid;
          
          this.addInvitation(uid,email,name);
          res.user.updateProfile({
            displayName: name,
            
          })
          
          this.db.collection('users').doc(uid).set({
            _name: name,
            _uid:uid,
            _email:email
          })

          resolve(res)
      }).catch(err=>{
        this.uti.errorAuth(err);
        reject(err)
      })
    })
    
  }

  logout(){
    this.AFauth.auth.signOut().then(()=>{
      //this.router.navigate(['/login']);
      console.log('usuario deslogueado');
    });
  }

  login(email:string,password:string){

    return new Promise((resolve,rejected)=>{
      this.AFauth.auth.signInWithEmailAndPassword(email,password).then(user =>{
        
        resolve(user)
      }).catch(err =>{
        this.uti.errorAuth(err);
        rejected(err);
      });
    })

   
  }
  isAuth(){
    return this.AFauth.authState.pipe(map(auth=>auth));
  }

  enviarCorreo() {
    this.AFauth.auth.currentUser.sendEmailVerification().then(s => {
      this.uti.presentAlert("¡Revisa tu bandeja!", "Por favor, revisa tu correo, hemos enviado un enlace de verificación")
      //this.terminar()
    }).catch(e => {
      this.uti.errorAuth(e);
      this.uti.presentAlert("Lo sentimos, no es posible verificar tu correo", "No se ha logrado verificar tu correo")
      //this.terminar()
    })
  }


  addInvitation(uidOwner:string,email:string,nombre:string){
   
    this.db.collection('invitations').doc(uidOwner).set({
      _email:email,
      _name:nombre
    }).then(s=>{
      this.uti.presentAlert("Invitation sent",'wait until you are approved');
    })
  }
  /*
  user: firebase.User;
  cambiar(newEmail: string) {
    this.user.updateEmail(newEmail).then(s => {
      this.uti.presentAlert("Correo modificado", "Tu correo se ha modificado, además, hemos enviado un correo para que puedas corroborarlo")
      //this.db.database.ref("users").child(this.user.uid).update({ correo: newEmail })
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
  }*/

}
