export const environment = {
  production: true,
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
  datadog: {
    service:'meka-lt',
    site: 'us5.datadoghq.com',
    clientToken: 'pubcd30d1ea0ddd306b8182c9370e19fd6a',
    applicationId: '7b98b913-a990-423c-a22e-d33a09db2b14',
  },
  api: {
    version: 'api/v2',
    url: 'https://api.meka.do',
    headers: { Authorization: '', }
  },
  maps: 'AIzaSyAylhtwYmgO_nuFZsQzvm_z6vAOvbEk80Q',
  stripe: 'https://us-central1-meka-app.cloudfunctions.net/stripe/api/v1',
  apiKeyStripe: 'pk_test_51JwvutBciJuLJJgxehspy5c9SROduRtoSFUOFSQ2PfpRBsD1QaXju0czIxUcPwv0NEOoDChSD4mLhrB79H0RSbrH00ozf6cT3F'
};
