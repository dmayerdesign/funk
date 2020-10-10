import { map } from "rxjs/operators"

import { Component, Inject } from "@angular/core"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { DEVICE_WIDTH, PAGE_TITLE } from "@funk/ui/app/tokens"
import { PageTitle } from "@funk/ui/core/atlas/page-title"
import { DeviceWidth } from "@funk/ui/plugins/layout/device-width"

@Component({
  template: `
    <ion-content class="poetry-route" style="--background: transparent">
      <article class="poetry-route-inner">
        <h2 *ngIf="(pageTitle | async) && (isDesktopLayout | async)">
          {{ pageTitle | async }}
        </h2>
        <managed-content
          contentId="poetry-publications-article"
        ></managed-content>
      </article>
    </ion-content>
  `,
})
export class PublicationsContainer {
  public isDesktopLayout = this._deviceWidth.pipe(
    map((deviceWidth) => deviceWidth > 960),
    shareReplayOnce()
  )

  public constructor(
    @Inject(PAGE_TITLE) public pageTitle: PageTitle,
    @Inject(DEVICE_WIDTH) private _deviceWidth: DeviceWidth
  ) {}
}
