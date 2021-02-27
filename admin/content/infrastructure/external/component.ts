import {
  Component,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"
import { ContentEditorService } from "@funk/admin/content/application/external/editor/service"
import { CONTENT_EDITOR_SERVICE } from "@funk/admin/content/infrastructure/external/tokens"
import { Content, ContentType } from "@funk/admin/content/model/content"
import { asPromise } from "@funk/helpers/as-promise"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { defer, Observable } from "rxjs"
import { map, shareReplay } from "rxjs/operators"

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
    <ng-container *ngIf="(contentType | async) === ContentType.HTML_BLOG_POST">
      <!--
        For blog posts, <content> should be used on a category page, wrapped around
        each blog post in the list.
      -->
      <ng-content></ng-content>
      <ng-container *ngIf="isAuthorized | async">
        <div class="edit-button" (click)="handleEditClick()">Edit</div>
      </ng-container>
    </ng-container>
    <!-- TODO:
      <ng-container *ngIf="(contentType | async) === ContentType.IMAGE">
        {{ contentValue | async }}
      </ng-container>
    -->
  `,
})
export class ContentComponent implements OnInit, OnDestroy {
  @Input() public contentId!: string

  public content: Observable<Content | undefined> = defer(() =>
    this._editorService.getMaybePreviewOrLiveContent(this.contentId),
  ).pipe(untilDestroyed(this), shareReplay(1))
  public contentType = this.content.pipe(map((content) => content?.type))
  public contentValue = this.content.pipe(map((content) => content?.value))
  public isAuthorized = this._editorService.getIsAuthorized()

  public readonly ContentType = ContentType

  public constructor(
    @Inject(CONTENT_EDITOR_SERVICE)
    private _editorService: ContentEditorService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.content.subscribe()
    this.contentValue.subscribe()
  }

  public ngOnDestroy(): void {}

  @HostListener("click")
  public async handleEditClick(): Promise<void> {
    if ((await asPromise(this.contentType)) !== ContentType.HTML_BLOG_POST) {
      this._editorService.openEditor(this.contentId)
    }
  }
}
