import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"
import { ContentCache } from "@funk/content/application/external/editor/behaviors/content-cache"
import { GetIsAuthorized } from "@funk/content/application/external/editor/behaviors/get-is-authorized"
import { GetMaybePreviewOrLiveContent } from "@funk/content/application/external/editor/behaviors/get-maybe-preview-or-live-content"
import { OpenEditor } from "@funk/content/application/external/editor/behaviors/open-editor"
import {
  CONTENT_CACHE,
  GET_IS_AUTHORIZED,
  GET_MAYBE_PREVIEW_OR_LIVE_CONTENT,
  OPEN_EDITOR,
} from "@funk/content/infrastructure/external/editor/tokens"
import { Content, ContentType } from "@funk/content/model/content"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { defer, Observable, of } from "rxjs"
import { delay, first, map, shareReplay, switchMap } from "rxjs/operators"

@UntilDestroy()
@Component({
  selector: "content",
  template: `
    <ng-container *ngIf="isAuthorized | async">
      <ion-button class="button edit-button">
        <ion-icon
          class="icon"
          lazy="true"
          slot="icon-only"
          name="create-sharp"
        ></ion-icon>
      </ion-button>
    </ng-container>

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
  @Input("cache") public useCache = false
  @Input() public clickToOpenImages = false

  public content: Observable<Content | undefined> = defer(() =>
    of(this._cache.get(this.contentId)).pipe(
      switchMap((maybeCachedContent) => {
        if (maybeCachedContent) return of(maybeCachedContent)
        else return this._getMaybePreviewOrLiveContent(this.contentId)
      }),
    ),
  ).pipe(shareReplay(1), untilDestroyed(this))
  public contentType = this.content.pipe(map((content) => content?.type))
  public contentValue = this.content.pipe(map((content) => content?.value))
  public isAuthorized = this._getIsAuthorized()

  public readonly ContentType = ContentType

  public constructor(
    @Inject(OPEN_EDITOR) private _openEditor: OpenEditor,
    @Inject(GET_MAYBE_PREVIEW_OR_LIVE_CONTENT)
    private _getMaybePreviewOrLiveContent: GetMaybePreviewOrLiveContent,
    @Inject(GET_IS_AUTHORIZED) private _getIsAuthorized: GetIsAuthorized,
    @Inject(CONTENT_CACHE) private _cache: ContentCache,
    private _elementRef: ElementRef<HTMLElement>,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.content.subscribe()
    this.contentValue.subscribe()

    if (this.useCache) {
      this.content.pipe(ignoreNullish(), first()).subscribe((content) => {
        this._cache.set(this.contentId, content)
      })
    }

    if (this.clickToOpenImages) {
      this.contentType.pipe(first(), delay(0)).subscribe((type) => {
        if (type === ContentType.HTML) {
          this._elementRef.nativeElement
            .querySelectorAll("img")
            .forEach((imgNode) => {
              imgNode.style.cursor = "pointer"
              imgNode.addEventListener("click", () => {
                const newWindow = window.open("", "_blank")
                newWindow?.document.write(`<img src="${imgNode.src}" />`)
                newWindow?.document.close()
              })
            })
        }
      })
    }
  }

  public ngOnDestroy(): void {}

  @HostListener("click")
  public async handleEditClick(): Promise<void> {
    this._openEditor(this.contentId)
  }
}
