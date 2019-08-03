// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.production.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  functionsUrl: 'http://localhost:5200/funk-e24ed/us-central1',
  firebaseConfig: {
    apiKey: 'AIzaSyAq7sB8Nmt-BY7wOVjsbt_2tK5s_oqpico',
    authDomain: 'funk-e24ed.firebaseapp.com',
    databaseURL: 'https://funk-e24ed.firebaseio.com',
    projectId: 'funk-e24ed',
    storageBucket: 'funk-e24ed.appspot.com',
    messagingSenderId: '438977829602',
    appId: '1:438977829602:web:7b6a5d89f9c36a46',
  },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'  // Included with Angular CLI.
