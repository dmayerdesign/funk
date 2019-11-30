import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { IdentityApi } from '../../identity/api'
import { NAVBAR_HEIGHT_PX } from '../config'

@Component({
  template: `
    <div id="home-inner"
      fxLayout="column"
      fxFlexFill>
      <div class="home-banner"
        [ngStyle]="{
          height: 'calc(100vh - ' + navbarHeight + ')'
        }">
        <form [formGroup]="loginFormGroup"
          (ngSubmit)="handleLoginSubmit()"
          fxLayout fxLayoutGap="10px">
          <input formControlName="email" placeholder="email" type="email" />
          <input formControlName="password" placeholder="password" type="password" />
          <input type="submit" style="visibility: hidden" />
        </form>
      </div>
    </div>
  `
})
export class HomeComponent
{
  public navbarHeight = NAVBAR_HEIGHT_PX + 'px'
  public loginFormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  constructor(
    private _identityApi: IdentityApi,
  )
  { }

  public async handleLoginSubmit(): Promise<void>
  {
    console.log(await this._identityApi.signInWithEmailAndPassword(
      this.loginFormGroup.get('email')!.value,
      this.loginFormGroup.get('password')!.value,
    ))
  }
}
