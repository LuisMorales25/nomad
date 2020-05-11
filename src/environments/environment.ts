// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  algolia:{
    appId:'YR2M25MXL9',
    apiKey:'915c8e96e039d8094abd074867973ead',
    indexName: 'prueba',
    urlSync: false
  }
};

export const firebaseConfig = {
  apiKey: "AIzaSyAh2WIRyNlLzi0v2mxYYvAB94wsIZguhPc",
  authDomain: "nomad-15f08.firebaseapp.com",
  databaseURL: "https://nomad-15f08.firebaseio.com",
  projectId: "nomad-15f08",
  storageBucket: "nomad-15f08.appspot.com",
  messagingSenderId: "658287088439",
  appId: "1:658287088439:web:322d3e4e89499c34d380b2",
  measurementId: "G-8NHR9H3PS3"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
