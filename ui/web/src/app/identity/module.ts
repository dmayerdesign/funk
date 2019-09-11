import { NgModule } from '@angular/core'
import { FireModule } from '../fire.module'
import { IdentityApi } from './api'

@NgModule({
  imports: [ FireModule ],
  providers: [ IdentityApi ]
})
export class IdentityModule { }
