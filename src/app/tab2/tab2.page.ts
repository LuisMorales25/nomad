import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  email:string;
  password:string;
  constructor(private authService:AuthService) {}

  Loguearse(){
    //console.log('estas en la funcion loguearse');
    this.authService.login(this.email,this.password).then(res=>{
      //this.Router.navigate(['/home']);
      console.log('a ingresado el usuario');
    }).catch(err=>{
      alert('datos incorrectos o el usuario no existe');
    })
  }
}
