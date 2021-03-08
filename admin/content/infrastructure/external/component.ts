import {
  Component,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"
import { GetMaybePreviewOrLiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-preview-or-live-content"
import { OpenEditor } from "@funk/admin/content/application/external/editor/behaviors/open-editor"
import { Content, ContentType } from "@funk/admin/content/model/content"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { defer, Observable } from "rxjs"
import { map, shareReplay } from "rxjs/operators"
import { GET_MAYBE_PREVIEW_OR_LIVE_CONTENT, OPEN_EDITOR } from "./editor/tokens"

@UntilDestroy()
@Component({
  selector: "content",
  template: `
    <ng-container *ngIf="(contentType | async) === ContentType.TEXT">
      {{ contentValue | async }}
    </ng-container>
    <ng-container *ngIf="(contentType | async) === ContentType.HTML">
      <div [innerHTML]="contentValue | async"></div>
    </ng-container>
    <!-- TODO:
      <ng-container *ngIf="(contentType | async) === ContentType.IMAGE">
        {{ contentValue | async }}
      </ng-container>
    -->

    <ng-template #htmlValue></ng-template>
  `,
})
export class ContentComponent implements OnInit, OnDestroy {
  @Input() public contentId!: string

  public content: Observable<Content | undefined> = defer(() =>
    this._getMaybePreviewOrLiveContent(this.contentId),
  ).pipe(untilDestroyed(this), shareReplay(1))
  public contentType = this.content.pipe(map((content) => content?.type))
  public contentValue = this.content.pipe(map((content) => content?.value))

  public readonly ContentType = ContentType

  public constructor(
    @Inject(OPEN_EDITOR) private _openEditor: OpenEditor,
    @Inject(GET_MAYBE_PREVIEW_OR_LIVE_CONTENT)
    private _getMaybePreviewOrLiveContent: GetMaybePreviewOrLiveContent,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.content.subscribe()
    this.contentValue.subscribe()
  }

  public ngOnDestroy(): void {}

  @HostListener("click")
  public async handleEditClick(): Promise<void> {
    this._openEditor(this.contentId)
  }
}
