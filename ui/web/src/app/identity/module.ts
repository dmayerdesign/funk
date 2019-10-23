import { NgModule } from '@angular/core'
import { AppFireModule } from '../fire.module'
import { IdentityApi } from './api'

@NgModule({
  imports: [ AppFireModule ],
  providers: [ IdentityApi ]
})
export class IdentityModule { }
