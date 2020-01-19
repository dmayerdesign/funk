import { NgModule } from '@angular/core'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { IdentityApi } from '@funk/ui/web/app/identity/api'

@NgModule({
  imports: [ AppFireModule ],
  providers: [ IdentityApi ],
})
export class IdentityModule
{ }
