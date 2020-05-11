import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

import * as algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { searchBox, hits,pagination ,analytics,panel,refinementList,clearRefinements} from 'instantsearch.js/es/widgets';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
//import { analytics } from 'firebase';
//import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'YR2M25MXL9',
  '915c8e96e039d8094abd074867973ead'
);

//const index=searchClient.initIndex('casas');



@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  
  

  config = {
    indexName: 'casas',
    searchClient/*,
    attributesForFaceting: [
      'country'
    ]*/
  };

  search:any;

  constructor() { }

  transformItems(items) {
    return items.map(item => ({
      ...item,
      highlighted: item.highlighted.toUpperCase(),
    }));
  }

  ngOnInit() {
    
/*
this.search = instantsearch({
  indexName: 'casas',
  searchClient,
});

    this.search.addWidget(
        searchBox({
          container:'#search-box',
          autofocus:false,
          placeholder:'buscar',
          poweredBy: true
        })
    );

  
    this.search.addWidget(
      hits({
        container:'#hits',
        templates:{
          empty:'No Results',
          item:`<img src={{image_path}} width="150px"><br>
          <strong>{{{_highlightResult.title_house.value}}}</strong>
          <br><span>  {{{_highlightResult.country.value}}}</span><br>
          <p>{{{_highlightResult.Description.value}}}</p>`
        }
        ,
        escapehits:true

      })
    );

    this.search.addWidget(
      pagination({
        container:'#pagination',
        maxPages:3,
      })
  );

      this.search.addWidget(
        analytics({
          pushFunction:(query,state,results)=>{
            console.log(query)
            console.log(state)
            console.log(results)
          }
        })
      );

   

    this.search.start();
*/
    
  }



}
