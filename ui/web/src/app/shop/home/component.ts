import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'ui/web/src/environments/environment'
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
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  public navbarHeight = NAVBAR_HEIGHT_PX + 'px'
  public text$?: Observable<string>

  constructor(
    private _httpClient: HttpClient
  ) { }

  public ngOnInit(): void {
    this.text$ = this._httpClient
      .get<{ text: string }>(`${environment.functionsUrl}/helloWorld`)
      .pipe(map(({ text }) => text))
  }
}
