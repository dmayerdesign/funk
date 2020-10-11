import { Component, Inject } from "@angular/core"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { DEVICE_WIDTH, PAGE_TITLE } from "@funk/ui/app/tokens"
import { PageTitle } from "@funk/ui/core/atlas/page-title"
import { DeviceWidth } from "@funk/ui/plugins/layout/device-width"
import { map } from "rxjs/operators"

@Component({
  template: `
    <ion-content
      class="professional-portfolio-route"
      style="--background: transparent"
    >
      <article class="professional-portfolio-route-inner">
        <h2 *ngIf="(pageTitle | async) && (isDesktopLayout | async)">
          {{ pageTitle | async }}
        </h2>
        <managed-content
          contentId="professional-portfolio-honors-article"
        ></managed-content>
      </article>
    </ion-content>
  `,
})
export class HonorsContainer {
  public isDesktopLayout = this._deviceWidth.pipe(
    map((deviceWidth) => deviceWidth > 960),
    shareReplayOnce()
  )

  public constructor(
    @Inject(PAGE_TITLE) public pageTitle: PageTitle,
    @Inject(DEVICE_WIDTH) private _deviceWidth: DeviceWidth
  ) {}
}
