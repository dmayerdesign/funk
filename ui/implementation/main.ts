import { enableProdMode } from "@angular/core"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { BrowserModule } from "@funk/ui/app/browser.module"
import { environment } from "@funk/ui/environments/environment"
import { defineCustomElements } from "@ionic/pwa-elements/loader"

if (!environment.production)
{
  /*
  * For easier debugging in development mode, you can import the following file
  * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
  *
  * This import should be commented out in production mode because it will have a negative impact
  * on performance if an error is thrown.
  */
  // require("zone.js/dist/zone-error") // Included with Angular CLI.
}

if (environment.production)
{
  enableProdMode()
}

document.addEventListener("DOMContentLoaded", () =>
{
  platformBrowserDynamic().bootstrapModule(BrowserModule)
    .then(() =>
    {
      defineCustomElements(window)
    })
    .catch(err => console.error(err))
})
