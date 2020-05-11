import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-continent',
  templateUrl: './continent.page.html',
  styleUrls: ['./continent.page.scss'],
})
export class ContinentPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  mapear(continente:string){
    this.route.navigate(['/map',continente]);
  }

}
