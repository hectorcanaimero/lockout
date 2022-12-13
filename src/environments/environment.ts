// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: 'pk.eyJ1IjoiaGVjdG9yY2FuYWltZXJvIiwiYSI6ImNsM292aWxpbzBzaHMzY3V2dGdzNnIzMWgifQ.fv7vU-ZTPUvlKe3VWmnpXA',
  firebase: {
    projectId: 'meka-app',
    measurementId: 'G-JG99NW4H1J',
    locationId: 'southamerica-east1',
    messagingSenderId: '882572463657',
    storageBucket: 'meka-app.appspot.com',
    authDomain: 'meka-app.firebaseapp.com',
    apiKey: 'AIzaSyAZQUQ65vngYX7_MWDqYDZ5utNn9yGkiWo',
    appId: '1:882572463657:web:96f5f79d52d0ef1ae69638',
  },
  api: {
    version: 'api/v2',
    url: 'https://api.meka.do',
    headers: { Authorization: '', }

  },
  // api: {
  //   version: 'v1',
  //   url: 'https://api.meka.do/api',
  //   headers: { Authorization: '', },
  //   admin: {email: 'knaimero@gmail.com', password: 'meka123'}
  // },
  maps: 'AIzaSyAylhtwYmgO_nuFZsQzvm_z6vAOvbEk80Q',
  stripe: 'https://us-central1-meka-app.cloudfunctions.net/stripe/api/v1',
  apiKeyStripe: 'pk_test_51JwvutBciJuLJJgxehspy5c9SROduRtoSFUOFSQ2PfpRBsD1QaXju0czIxUcPwv0NEOoDChSD4mLhrB79H0RSbrH00ozf6cT3F'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
