import { Component, Inject } from "@angular/core"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { PageTitle } from "@funk/ui/atlas/application/external/page-title"
import {
    DEVICE_WIDTH,
    PAGE_TITLE
} from "@funk/ui/infrastructure/external/tokens"
import { DeviceWidth } from "@funk/ui/plugins/external/layout/device-width"
import { map } from "rxjs/operators"

@Component({
  template: `
    <ion-content
      class="content professional-portfolio-route"
      style="--background: transparent"
    >
      <article class="professional-portfolio-route-inner">
        <h2 *ngIf="(pageTitle | async) && (isDesktopLayout | async)">
          {{ pageTitle | async }}
        </h2>
        <content
          contentId="professional-portfolio-publications-article"
        ></content>
      </article>
    </ion-content>
  `,
})
export class PublicationsContainer {
  public isDesktopLayout = this._deviceWidth.pipe(
    map((deviceWidth) => deviceWidth > 960),
    shareReplayOnce(),
  )

  public constructor(
    @Inject(PAGE_TITLE) public pageTitle: PageTitle,
    @Inject(DEVICE_WIDTH) private _deviceWidth: DeviceWidth,
  ) {}
}
