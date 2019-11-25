import { Component } from '@angular/core'
import { ModuleContainer } from '@funk/ui/helpers/angular.helpers'
import { ShopApi } from './api'
import { NAVBAR_HEIGHT_PX } from './config'

@Component({
  selector: 'shop',
  template: `
    <nav class="mat-elevation-z10">
      <button mat-button [matMenuTriggerFor]="menu">Menu</button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>Item 1</button>
        <button mat-menu-item>Item 2</button>
      </mat-menu>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav button {
      padding-top: ${NAVBAR_HEIGHT_PX / 3}px;
      padding-bottom: ${NAVBAR_HEIGHT_PX / 3}px;
      line-height: ${NAVBAR_HEIGHT_PX / 3}px;
      overflow: visible;
      white-space: normal;
    }
  `],
})
export class ShopContainer extends ModuleContainer {
  constructor(
    public api: ShopApi,
  )
  {
    super(api)
  }
}
