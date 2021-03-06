import {
  Component,
  ContentChild,
  Inject,
  Input,
  TemplateRef,
} from "@angular/core"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { PageTitle } from "@funk/ui/atlas/application/external/page-title"
import {
  DEVICE_WIDTH,
  PAGE_TITLE,
} from "@funk/ui/infrastructure/external/tokens"
import { DeviceWidth } from "@funk/ui/plugins/external/layout/device-width"
import { map } from "rxjs/operators"

@Component({
  selector: "page-title-heading",
  template: `
    <ng-container
      *ngIf="
        (layout === 'landscape' && (isLandscapeLayout | async)) ||
        (layout === 'portrait' && (isPortraitLayout | async))
      "
    >
      <h2 *ngIf="pageTitle | async">
        <ng-container *ngIf="before">
          <ng-container *ngTemplateOutlet="before"></ng-container>
        </ng-container>

        {{ pageTitle | async }}

        <ng-container *ngIf="after">
          <ng-container *ngTemplateOutlet="after"></ng-container>
        </ng-container>
      </h2>
    </ng-container>
  `,
})
export class PageTitleHeading {
  @Input() public layout: "landscape" | "portrait" = "landscape"
  @ContentChild("before", { read: TemplateRef }) public before?: TemplateRef<
    any
  >
  @ContentChild("after", { read: TemplateRef }) public after?: TemplateRef<any>

  public isLandscapeLayout = this._deviceWidth.pipe(
    map((deviceWidth) => deviceWidth > 960),
    shareReplayOnce(),
  )
  public isPortraitLayout = this._deviceWidth.pipe(map((width) => width < 961))

  public constructor(
    @Inject(PAGE_TITLE) public pageTitle: PageTitle,
    @Inject(DEVICE_WIDTH) private _deviceWidth: DeviceWidth,
  ) {}
}
