import { APP_INITIALIZER, NgModule } from '@angular/core'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { createModuleInitializer } from '@funk/ui/web/app/initializer'

@NgModule({
  imports: [ AppFireModule ],
  providers: [
    IdentityApi,
    {
      provide: APP_INITIALIZER,
      useFactory: createModuleInitializer,
      deps: [ IdentityApi ],
      multi: true,
    },
  ],
})
export class IdentityModule
{ }
