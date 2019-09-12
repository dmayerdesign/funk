import { Component } from '@angular/core'
import { IdentityApi } from './identity/api'

@Component({
  selector: 'app-root',
  template: `
    <button (click)="createUser()">Create User</button>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  public title = 'web'

  constructor(
    private _identityApi: IdentityApi
  ) { }

  public createUser(): void {
    this._identityApi.createUserWithEmailAndPassword(
      `test_${Date.now()}@sharklasers.com`,
      'Tester01!'
    )
  }
}
