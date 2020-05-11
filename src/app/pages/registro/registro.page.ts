import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import {Router} from '@angular/router';
import { HomesService } from 'src/app/servicios/homes.service';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public email:string;
  public password: string;
  public name: string;
  public house_name:string;
  public house_country:string;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  @ViewChild('imageUser',{static: true}) inputImageUser:ElementRef;

  constructor(private authservice:AuthService, private router: Router,
              private houseService:HomesService, private storage:AngularFireStorage) { }

  ngOnInit() {
  }

  NewUser(){
    this.authservice.registrarse(this.email,this.password,this.name).then(auth=>{
      console.log('el usuario se ha solicitado',auth);
      this.houseService.addHouse(this.email,this.house_name,this.house_country,this.inputImageUser.nativeElement.value);
      //this.authservice.addInvitation(auth.id,this.email,this.name);
      this.router.navigate(['/']);
    }).catch(err=>{
      console.log(err)
    })

    
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

}
