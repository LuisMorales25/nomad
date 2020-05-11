import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UtilitiesService } from '../servicios/utilities.service';
import { CorroborarComponent } from '../componentes/corroborar/corroborar.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  username;
  constructor(private authService:AuthService, private router:Router,
    private modalController: ModalController,
    private uti: UtilitiesService,) {}

  ngOnInit(){
    this.authService.isAuth().subscribe(user=>{
      if(user){
        if(user.emailVerified){
          this.username=user.displayName;
      
        console.log('usuario es: ',user);
          
        }else{
          console.log('el usuairo no se ha verificado');
          this.crearModalCorroborarUsuario() 

        }
        
      }
    
    })
  }

  LogOut(){
    this.authService.logout();
    this.username=null;
  }

  crearModalCorroborarUsuario() {
    this.modalController.create({
      component: CorroborarComponent//,
      //swipeToClose: true,
    }).then((modal)=>{
      modal.present();
    });

  }

}
