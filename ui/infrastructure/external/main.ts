import { enableProdMode } from "@angular/core"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { INTEGRATION_TEST, IS_PRODUCTION } from "@funk/configuration"
import { initializeStore } from "@funk/test/plugins/external/persistence/in-memory-store"
import { BrowserModule } from "@funk/ui/infrastructure/external/browser.module"
import { defineCustomElements } from "@ionic/pwa-elements/loader"

// if (!IS_PRODUCTION)
// {
//  For easier debugging in development mode, you can import the following file
//  to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
//  This import should be commented out in production mode because it will have a negative impact
//  on performance if an error is thrown.
// require("zone.js/dist/zone-error") // Included with Angular CLI.
// }

// TODO: Confirm whether these imports are needed. This article suggests they might be:
// https://medium.com/better-programming/zone-js-for-angular-devs-573d89bbb890
// import "zone.js/dist/zone-patch-rxjs"
// import "zone.js/dist/zone-patch-cordova"

if (IS_PRODUCTION) {
  enableProdMode()
}

if (INTEGRATION_TEST) {
  initializeStore()
}

document.addEventListener("DOMContentLoaded", () => {
  platformBrowserDynamic()
    .bootstrapModule(BrowserModule)
    .then(() => {
      defineCustomElements(window)
      console.log("Bootstrapped successfully.")
    })
    .catch((err) => console.error(err))
})
