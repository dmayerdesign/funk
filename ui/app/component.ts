import { Component, Inject, OnInit, ViewChild } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"
import { BuildMenuItem } from "@funk/model/ui/atlas/behaviors/build-menu-item"
import { BUILD_MENU_ITEM } from "@funk/ui/app/atlas/tokens"
import { AppAtlas } from "@funk/ui/core/atlas/atlas"
import { IonMenu } from "@ionic/angular"

@Component({
  selector: "app-root",
  styles: [
    `
      #routes {
        height: 100vh;
      }
    `,
  ],
  template: `
    <ion-app class="app">
      <ion-menu class="menu" side="start" content-id="main">
        <ion-header class="header">
          <ion-toolbar class="toolbar" translucent>
            <ion-title class="title">Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="content">
          <ion-list class="list">
            <ng-container *ngFor="let menuLink of menuItems">
              <ion-item class="item" [routerLink]="menuLink.url">
                <ion-label class="label">{{ menuLink.label }}</ion-label>
              </ion-item>
            </ng-container>
          </ion-list>
        </ion-content>
      </ion-menu>

      <div id="routes">
        <managed-content-editor>
          <ion-router-outlet class="router-outlet"></ion-router-outlet>
        </managed-content-editor>
      </div>
    </ion-app>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild(IonMenu) public menu!: IonMenu
  public menuItems = [
    this._buildMenuItem("shop", "home"),
    this._buildMenuItem("shop", "checkout"),
  ]

  public constructor(
    private readonly _router: Router,
    @Inject(BUILD_MENU_ITEM)
    private readonly _buildMenuItem: BuildMenuItem<AppAtlas>,
  ) {}

  public ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menu.close()
      }
    })
  }
}
