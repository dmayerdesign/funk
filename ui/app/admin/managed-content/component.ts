import {
  Component,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"
import {
  ManagedContent,
  ManagedContentType,
} from "@funk/model/managed-content/managed-content"
import { MANAGED_CONTENT_EDITOR_SERVICE } from "@funk/ui/app/admin/managed-content/tokens"
import { ManagedContentEditorService } from "@funk/ui/core/admin/managed-content/editor/service"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { defer, Observable } from "rxjs"
import { map, shareReplay } from "rxjs/operators"

@UntilDestroy()
@Component({
  selector: "managed-content",
  template: `
    <ng-container *ngIf="(contentType | async) === ManagedContentType.TEXT">
      {{ contentValue | async }}
    </ng-container>
    <ng-container *ngIf="(contentType | async) === ManagedContentType.HTML">
      <div [innerHTML]="contentValue | async"></div>
    </ng-container>
    <!-- TODO:
      <ng-container *ngIf="(contentType | async) === ManagedContentType.IMAGE">
        {{ contentValue | async }}
      </ng-container>
    -->

    <ng-template #htmlValue></ng-template>
  `,
})
export class ManagedContentComponent implements OnInit, OnDestroy {
  @Input() public contentId!: string

  public content: Observable<ManagedContent | undefined> = defer(() =>
    this._editorService.getMaybePreviewOrLiveContent(this.contentId),
  ).pipe(untilDestroyed(this), shareReplay(1))
  public contentType = this.content.pipe(map((content) => content?.type))
  public contentValue = this.content.pipe(map((content) => content?.value))

  public readonly ManagedContentType = ManagedContentType

  public constructor(
    @Inject(MANAGED_CONTENT_EDITOR_SERVICE)
    private _editorService: ManagedContentEditorService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.content.subscribe()
    this.contentValue.subscribe()
  }

  public ngOnDestroy(): void {}

  @HostListener("click")
  public async handleEditClick(): Promise<void> {
    this._editorService.openEditor(this.contentId)
  }
}
