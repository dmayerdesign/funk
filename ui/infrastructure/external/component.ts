import { Component, Inject, OnInit, ViewChild } from "@angular/core"
import { NavigationEnd, NavigationError, Router } from "@angular/router"
import { INTEGRATION_TEST } from "@funk/configuration"
import { AppAtlas } from "@funk/ui/atlas/configuration"
import { BUILD_MENU_ITEM } from "@funk/ui/atlas/infrastructure/external/tokens"
import { BuildMenuItem } from "@funk/ui/atlas/model/behaviors/build-menu-item"
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
      <ion-menu class="menu" side="start" content-id="routes">
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
        <content-editor>
          <ion-router-outlet class="router-outlet"></ion-router-outlet>
        </content-editor>
      </div>

      <ng-container *ngIf="isIntegrationTest">
        <a
          id="go-to-test-data-visualizer"
          routerLink="/test-data-visualizer"
          [style]="{
            position: 'absolute',
            zIndex: '9999'
          }"
          >go to data visualizer</a
        >
      </ng-container>
    </ion-app>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild(IonMenu) public menu!: IonMenu
  public readonly isIntegrationTest = INTEGRATION_TEST
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
      if (event instanceof NavigationError) {
        console.error(event)
      }
      if (event instanceof NavigationEnd) {
        this.menu.close()
      }
    })
  }
}
