import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class HomesService {
  dbF;
  constructor(private db:AngularFirestore,private uti: UtilitiesService) {
    this.dbF=firebase.firestore();
   }

   addHouse(email:string,house_name:string,country:string,photo:any){
    this.dbF.collection('users').where('_email','==',email).get().then(us=>{
      if (us.empty) {
        console.log('no seencontro');
        return;
      }
      us.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
        var idcasa = "";
        for (var i=0; i<15; i++) idcasa +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
        console.log(idcasa);
        this.db.collection('houses').doc(idcasa).set({
          _name: house_name,
          _country:country,
          _photo: photo,
          _uidOwner:doc.id
        })
        console.log('casa agregada');
      });

    }) .catch(err => {
        console.log('Error getting documents', err);
      });

   }
}
