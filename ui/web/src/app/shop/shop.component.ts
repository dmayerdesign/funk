import { Component } from '@angular/core'
import { HEIGHT_PX } from './shop-navigation.config'

@Component({
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
      padding-top: ${HEIGHT_PX / 3}px;
      padding-bottom: ${HEIGHT_PX / 3}px;
      line-height: ${HEIGHT_PX / 3}px;
      overflow: visible;
      white-space: normal;
    }
  `]
})
export class ShopComponent {

}
