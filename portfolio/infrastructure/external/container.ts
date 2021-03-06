import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core"
import { GetById as GetContentById } from "@funk/content/application/external/behaviors/persistence/get-by-id"
import { GET_CONTENT_BY_ID } from "@funk/content/infrastructure/external/persistence/tokens"
import { PageTitle } from "@funk/ui/atlas/application/external/page-title"
import atlas from "@funk/ui/atlas/configuration"
import { Atlas } from "@funk/ui/atlas/model/atlas"
import {
  DEVICE_WIDTH,
  PAGE_TITLE,
} from "@funk/ui/infrastructure/external/tokens"
import { DeviceWidth } from "@funk/ui/plugins/external/layout/device-width"
import { LoadingController } from "@ionic/angular"
import { map } from "rxjs/operators"

const portfolioPaths = Object.keys(atlas) as (keyof typeof atlas)[]

@Component({
  template: `
    <div id="portfolio-container">
      <ng-container *ngIf="!(isMobileLayout | async)">
        <div id="banner-and-navigation">
          <div role="banner">
            <h1>
              <content contentId="portfolio-title"></content>
            </h1>
            <p>
              <content contentId="portfolio-subtitle"></content>
            </p>
          </div>

          <nav>
            <ul>
              <ng-container *ngFor="let navItem of navigationItems">
                <li>
                  <a
                    [routerLink]="navItem.routerLink"
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: true }"
                  >
                    {{ navItem.text }}
                  </a>
                </li>
              </ng-container>
            </ul>
          </nav>
        </div>

        <div id="portfolio-routes">
          <ion-router-outlet class="router-outlet"></ion-router-outlet>
        </div>
      </ng-container>

      <ng-container *ngIf="isMobileLayout | async">
        <ion-header
          class="header"
          style="
            --background: transparent
          "
        >
          <ion-toolbar
            class="toolbar max-width-container"
            style="
              --background: transparent;
              --border-width: 0;
            "
          >
            <ion-buttons class="buttons" slot="end">
              <ion-menu-button
                class="menu-button"
                style="
                --color: var(--ion-color-dark-contrast);
              "
              >
              </ion-menu-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <div id="banner-and-routes">
          <div id="banner">
            <div role="banner">
              <h1>
                <content contentId="portfolio-title"></content>
              </h1>
              <p>
                <content contentId="portfolio-subtitle"></content>
              </p>
            </div>
            <page-title-heading layout="portrait"></page-title-heading>
          </div>
          <div id="portfolio-routes">
            <ion-router-outlet class="router-outlet"></ion-router-outlet>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ["./container.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PortfolioContainer implements OnInit {
  public readonly navigationItems = portfolioPaths
    .filter((path) => ((atlas[path] as unknown) as Atlas).public)
    .map((path) => ({
      text: atlas[path].label,
      routerLink: ["/", path],
    }))
  public isMobileLayout = this._deviceWidth.pipe(map((width) => width < 961))

  public constructor(
    @Inject(DEVICE_WIDTH) private _deviceWidth: DeviceWidth,
    @Inject(GET_CONTENT_BY_ID) private _getContentById: GetContentById,
    private _loadingController: LoadingController,
    @Inject(PAGE_TITLE) public pageTitle: PageTitle,
  ) {}

  public async ngOnInit(): Promise<void> {
    const canary = this._getContentById("portfolio-title")
    const loading = await this._loadingController.create({
      id: "portfolio-loading",
    })
    loading.present()
    await canary
    await this._loadingController.dismiss("portfolio-loading")
  }
}
