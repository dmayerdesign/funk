import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'ui/web/src/environments/environment'
import { IdentityApi } from '../../identity/api'
import { NAVBAR_HEIGHT_PX } from '../config'

@Component({
  template: `
    <div id="home-inner"
      fxLayout="column"
      fxFlexFill>
      <div class="home-banner"
        [ngStyle]="{
          height: 'calc(100vh - ' + navbarHeight + ')',
          backgroundColor: 'blue'
        }">
        <p [style.color]="'white'">
          {{ text$ | async | json }}
        </p>
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
export class HomeComponent implements OnInit
{
  public navbarHeight = NAVBAR_HEIGHT_PX + 'px'
  public text$?: Observable<string>
  public loginFormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  constructor(
    private _httpClient: HttpClient,
    private _identityApi: IdentityApi,
  )
  { }

  public async ngOnInit(): Promise<void>
  {
    this.text$ = this._httpClient
      .get<{ text: string }>(`${environment.functionsUrl}/helloWorld`)
      .pipe(map(({ text }) => text))
  }

  public async handleLoginSubmit(): Promise<void>
  {
    console.log(await this._identityApi.signInWithEmailAndPassword(
      this.loginFormGroup.get('email')!.value,
      this.loginFormGroup.get('password')!.value,
    ))
  }
}
