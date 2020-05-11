import { Component } from '@angular/core';
import { AuthService} from '../servicios/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public email:string;
  public password: string;
  public name: string;
  constructor(private authservice:AuthService, private router: Router) {}

  NewUser(){
    this.authservice.registrarse(this.email,this.password,this.name).then(auth=>{
      console.log('el usuario se ha solicitado',auth)
      ///this.router.navigate(['/home']);
    }).catch(err=>{
      console.log(err)
    })
  }

}
