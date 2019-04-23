// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // webApiUrl: 'http://localhost:60967', //leti - onetree
  // webApiUrl: 'http://localhost:64328', //leti - casa
  webApiUrl: 'https://trivia-ot.azurewebsites.net', //leti - casa
  webApiUrl: 'http://localhost:65459', //lu
  uploadUserImage: 'https://triviadata.blob.core.windows.net/userimages/default-hover.png',
  defaultUserImage: 'https://triviadata.blob.core.windows.net/userimages/default.png',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
