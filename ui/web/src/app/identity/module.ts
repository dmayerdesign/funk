import { APP_INITIALIZER, NgModule } from "@angular/core"
import { IDENTITY } from "@funk/ui/core/identity/interface"
import { AppFireModule } from "@funk/ui/web/app/fire.module"
import { createModuleInitializer } from "@funk/ui/web/app/initializer"

/**
 * This module should only be imported in the root module.
 */
@NgModule({
  imports: [ AppFireModule ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: createModuleInitializer,
      deps: [ IDENTITY ],
      multi: true,
    },
  ],
})
export class IdentityModule
{ }
