import { Component, NgZone, OnInit } from '@angular/core'
import { setUpDevTools } from '@dannymayer/vex'
import { environment } from '../environments/environment'
import { IdentityApi } from './identity/api'

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav role="navigation">
        <!--this is a place for us to add side-nav code-->
      </mat-sidenav>
      <mat-sidenav-content>
        <!--in here all the content must reside. We will add a navigation header as well-->
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class AppComponent implements OnInit {
  public title = 'web'

  constructor(
    private _ngZone: NgZone,
    private _identityApi: IdentityApi,
  ) { }

  public ngOnInit(): void {
    if (!environment.production) {
      setTimeout(() => this._ngZone.run(() => setUpDevTools()))
    }
  }

  public createUser(): void {
    this._identityApi.createUserWithEmailAndPassword(
      `test_${Date.now()}@sharklasers.com`,
      'Tester01!'
    )
  }
}
