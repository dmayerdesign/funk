import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'ui/web/src/environments/environment'
import { HEIGHT_PX } from '../shop-navigation.config'

@Component({
  template: `
    <div id="home-inner"
      fxLayout="column"
      fxFlexFill>

      <div class="home-banner"
        [ngStyle]="{
          height: 'calc(100vh -' + navbarHeight + ')',
          backgroundColor: 'blue'
        }">

        <p [style.color]="'white'">
          {{ text$ | async }}
        </p>

      </div>

    </div>
  `
})
export class HomeComponent implements OnInit {
  public navbarHeight = HEIGHT_PX + 'px'
  public text$: Observable<string>

  constructor(
    private _httpClient: HttpClient
  ) {
    console.log(environment)
  }

  public ngOnInit(): void {
    this.text$ = this._httpClient.get<string>(`${environment.functionsUrl}/helloWorld`)
  }
}
