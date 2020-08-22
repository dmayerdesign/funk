import { Component, ViewEncapsulation } from "@angular/core"
import atlas, { PoetryAtlas } from "@funk/ui/app/atlas/atlas"

const poetryAtlas = atlas.poetry.__atlas__
const poetryPaths = Object.keys(poetryAtlas) as (keyof PoetryAtlas)[]

@Component({
  template: `
    <div id="poetry-container">
      <div id="banner-and-navigation">
        <div role="banner">
          <h1>
            <managed-content contentId="poetry-title"></managed-content>
          </h1>
          <p>
            <managed-content contentId="poetry-subtitle"></managed-content>
          </p>
        </div>

        <nav>
          <ul>
            <ng-container *ngFor="let navItem of navigationItems">
              <li>
                <a [routerLink]="navItem.routerLink"
                  routerLinkActive="active">
                  {{ navItem.text }}
                </a>
              </li>
            </ng-container>
          </ul>
        </nav>
      </div>

      <div id="poetry-routes">
        <ion-router-outlet></ion-router-outlet>
      </div>
    </div>
  `,
  styleUrls: [ "./container.scss" ],
  encapsulation: ViewEncapsulation.None,
})
export class PoetryContainer
{
  public readonly navigationItems = poetryPaths.map((path) => ({
    text: poetryAtlas[path].label,
    routerLink: [ "/poetry", path ],
  }))
}
