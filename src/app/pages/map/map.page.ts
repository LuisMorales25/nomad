import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var google;
interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string,
  zoom: number,
  city: string,
  town:string
}

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  demoContinentes;

  demoCities:Marker[]=[];
  demoTowns:Marker[]=[];

  markersAmerica: Marker[] = [
    {
      position: {
        lat: 20.04425177651447,
        lng: -100.0938683336389,
      },
      title: 'Mexico',
      zoom: 12,
      city: 'Queretaro',
      town: 'pueblo mexico'
    },
    {
      position: {
        lat: 14.68907395426568,
        lng: -90.01853099650496,
      },
      title: 'Guatemala',
      zoom: 12,
      city: 'Jalapa',
      town: 'pueblo guate'
    },
    {
      position: {
        lat: 4.018395497270646,
        lng: -73.10635760918784,
      },
      title: 'Colombia',
      zoom: 10,
      city: 'Bogota',
      town: 'pueblo colombia'
    }/*,
    {
      position: {
        lat: 26.969587586068442,
        lng: -105.8121674435316,
      },
      title: 'Mexico',
      zoom: 10
    }*/
  ];

  markersEuropa: Marker[] = [
    {
      position: {
        lat: 46.75012238574149,
        lng: 2.278755681245883,
      },
      title: 'Francia',
      zoom: 13,
      city: 'ciudad 1 francia',
      town: 'pueblo francia'
    },
    {
      position: {
        lat: 43.24019185754585,
        lng: 12.174176280206126,
      },
      title: 'Italia',
      zoom: 13,
      city: 'ciudad 1 italia',
      town: 'pueblo italia'
    },
    {
      position: {
        lat: 50.699574955805275,
        lng: 10.195092160391482,
      },
      title: 'Alemania',
      zoom: 12,
      city: 'ciudad 1 alemania',
      town: 'pueblo alemania'
    }
  ];


  map=null;
   mapEle :  HTMLElement;
  constructor(private route: ActivatedRoute) { 
    
  }

  continente;
  pais;
  ciudad;

  ngOnInit() {
    this.continente=this.route.snapshot.paramMap.get('continente');
    this.pais=this.route.snapshot.paramMap.get('pais');
    this.ciudad=this.route.snapshot.paramMap.get('city');
    this.mapEle = document.getElementById('map');
    this.loadMap(this.continente);
    this.getPais(this.pais);
    this.getCity(this.ciudad);
  }


  loadMap(continente:string) {
    console.log('llega-<',continente);
    // create a new map by passing HTMLElement
    
    let myLatLng ;
    let zoomC;
    // create LatLng object
    if (continente=="america") {
      myLatLng = {lat: 4.658383846282959, lng: -74.09394073486328};
      zoomC=2;
      this.demoContinentes=this.markersAmerica;

    } else if(continente=="europa"){
     myLatLng = {lat: 49.522772162966675, lng: 15.952427781644332};
     zoomC=4;
     this.demoContinentes=this.markersEuropa;
  
    }
    
    
      this.map = new google.maps.Map(this.mapEle, {
        center: myLatLng,
        zoom: zoomC
        
      });

  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
     // this.renderMarkers(this.markersPrueba);
     this.showmarkers();
      this.mapEle.classList.add('show-map');
    });

    
  }

  getPais(pais){
    this.demoContinentes.forEach(element => {
      if (element.title==pais) {
        console.log('se encontro el pais');
        this.map = new google.maps.Map(this.mapEle, {
          center: element.position,
          zoom: element.zoom / 3
          
        });
      }else{
        console.log('no se encontro el pais',element.title);
      }
    });

    this.demoContinentes.forEach(ele=>{
      console.log('el valor de ele es->',ele.title);
   
      if (ele.title==pais) {
        this.demoCities.push(ele);
      }
    })
  }

  getCity(ciudad){
    console.log('entro al metodo de ciudad');

    
    this.demoCities.forEach(element => {
      if (element.city==ciudad) {
        console.log('se encontro la ciudad');
        this.map = new google.maps.Map(this.mapEle, {
          center: element.position,
          zoom: element.zoom / 2
          
        });
      }else{
        console.log('no se encontro la ciudad',element.city);
      }
    });
  }

  changePlace(event){
    this.demoCities=[];
    console.log('entro al envento->',event.detail.value);
    this.map = new google.maps.Map(this.mapEle, {
      center: event.detail.value.position,
      zoom: event.detail.value.zoom / 3
      
    });
    this.demoContinentes.forEach(ele=>{
      console.log('el valor de ele es->',ele.title);
   
      if (ele.title==event.detail.value.title) {
        
        this.demoCities.push(ele);
      }
    })
    history.replaceState({urlpath:'/continent'},null,"/map/"+this.continente+ "/"+event.detail.value.title)
    this.showmarkers();
  }

  changePlace2(event){
    this.demoTowns=[];
    console.log('entro al enventoT->',event.detail.value);
    this.map = new google.maps.Map(this.mapEle, {
      center: event.detail.value.position,
      zoom: event.detail.value.zoom / 2
      
    });
    this.demoContinentes.forEach(ele=>{
      console.log('el valor de eleT es->',ele.title);
   
      if (ele.title==event.detail.value.title) {
        this.demoTowns.push(ele);
      }
    })
    history.replaceState({urlpath:'/continent'},null,"/map/"+this.continente+ "/"+event.detail.value.title+"/"+event.detail.value.city);
    this.showmarkers();
  }

  changePlace3(event){
    this.demoTowns=[];
    console.log('entro al enventoT->',event.detail.value);
    this.map = new google.maps.Map(this.mapEle, {
      center: event.detail.value.position,
      zoom: event.detail.value.zoom 
      
    });
    history.replaceState({urlpath:'/continent'},null,"/map/"+this.continente+ "/"+event.detail.value.title+"/"+event.detail.value.city+"/"+event.detail.value.town);
    this.showmarkers();
  }

  showmarkers(){
    let continent=this.continente;

    this.markersAmerica.forEach(mark=>{
      var marker= new google.maps.Marker({
        position: mark.position,
        map:this.map,
        title: mark.title,
        zoom:mark.zoom,
        city:mark.city,
        town:mark.town
      });

      marker.addListener('click', function() {
        this.map.setZoom(marker.zoom);
        this.map.setCenter(marker.getPosition());
        history.replaceState({urlpath:'/continent'},null,"/map/"+continent+ "/"+marker.title+"/"+marker.city+"/"+marker.town);
      });
    })

    this.markersEuropa.forEach(mark=>{
      var marker= new google.maps.Marker({
        position: mark.position,
        map:this.map,
        title: mark.title,
        zoom:mark.zoom,
        city:mark.city,
        town:mark.town
      });

      marker.addListener('click', function() {
        this.map.setZoom(marker.zoom);
        this.map.setCenter(marker.getPosition());
        history.replaceState({urlpath:'/continent'},null,"/map/"+continent+ "/"+marker.title+"/"+marker.city+"/"+marker.town);
      });
    })

   
  }


}
