import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core"
import { Atlas } from "@funk/model/ui/atlas/atlas"
import { GET_BY_ID } from "@funk/ui/app/persistence/tokens"
import { DEVICE_WIDTH, PAGE_TITLE } from "@funk/ui/app/tokens"
import atlas from "@funk/ui/core/atlas/atlas"
import { PageTitle } from "@funk/ui/core/atlas/page-title"
import { DeviceWidth } from "@funk/ui/plugins/layout/device-width"
import { GetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"
import { LoadingController } from "@ionic/angular"
import { map } from "rxjs/operators"

const professionalPortfolioPaths = Object.keys(atlas) as (keyof typeof atlas)[]

@Component({
  template: `
    <div id="professional-portfolio-container">
      <ng-container *ngIf="!(isMobileLayout | async)">
        <div id="banner-and-navigation">
          <div role="banner">
            <h1>
              <managed-content
                contentId="professional-portfolio-title"
              ></managed-content>
            </h1>
            <p>
              <managed-content
                contentId="professional-portfolio-subtitle"
              ></managed-content>
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

        <div id="professional-portfolio-routes">
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
                <managed-content
                  contentId="professional-portfolio-title"
                ></managed-content>
              </h1>
              <p>
                <managed-content
                  contentId="professional-portfolio-subtitle"
                ></managed-content>
              </p>
            </div>
            <h2 *ngIf="pageTitle | async">
              {{ pageTitle | async }}
            </h2>
          </div>
          <div id="professional-portfolio-routes">
            <ion-router-outlet class="router-outlet"></ion-router-outlet>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ["./container.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProfessionalPortfolioContainer implements OnInit {
  public readonly navigationItems = professionalPortfolioPaths
    .filter((path) => ((atlas[path] as unknown) as Atlas).public)
    .map((path) => ({
      text: atlas[path].label,
      routerLink: ["/", path],
    }))
  public isMobileLayout = this._deviceWidth.pipe(map((width) => width < 961))

  public constructor(
    @Inject(DEVICE_WIDTH) private _deviceWidth: DeviceWidth,
    @Inject(GET_BY_ID) private _getById: GetById,
    private _loadingController: LoadingController,
    @Inject(PAGE_TITLE) public pageTitle: PageTitle,
  ) {}

  public async ngOnInit(): Promise<void> {
    const canary = this._getById("contents", "page-title")
    const loading = await this._loadingController.create({
      id: "POETRY_LOADING",
    })
    loading.present()
    await canary
    await this._loadingController.dismiss("POETRY_LOADING")
  }
}
