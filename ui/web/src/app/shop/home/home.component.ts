import { Component } from '@angular/core'

@Component({
  template: `
    <div id="home-inner"
      fxLayout="row"
      fxLayout.lt-sm="column"
      fxFlexFill>

      <div class="home-banner">

      </div>

      <div class=""
        fxFlex="15"
        fxFlex.lt-sm="55">
        first-section
      </div>
      <div class=""
        fxFlex="30">
        second-section
      </div>
      <div class=""
        fxFlex="55"
        fxFlex.lt-sm="15">
        third-section
      </div>

    </div>
  `
})
export class HomeComponent {

}
