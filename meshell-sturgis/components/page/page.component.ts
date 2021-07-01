import { Component, Inject, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { GetIsAuthorized } from "@funk/content/application/external/editor/behaviors/get-is-authorized"
import { OpenHtmlBlogPostEditor } from "@funk/content/application/external/editor/behaviors/open-html-blog-post-editor"
import {
  GET_IS_AUTHORIZED,
  OPEN_HTML_BLOG_POST_EDITOR,
} from "@funk/content/infrastructure/external/editor/tokens"
import { Subscription } from "rxjs"
import { first } from "rxjs/operators"

@Component({
  selector: "ms-page",
  template: `
    <header class="page-title">
      <h1 *ngIf="titleId" class="display-heading-{{ page }}">
        <content [cache]="true" [contentId]="titleId"></content>
      </h1>
      <ms-back-btn></ms-back-btn>
    </header>

    <article class="main-content">
      <div *ngIf="coverImageId" [style]="{ paddingBottom: '20px' }">
        <content [cache]="true" [contentId]="coverImageId"></content>
      </div>
      <content
        [cache]="true"
        [contentId]="bodyId"
        [clickToOpenImages]="true"
      ></content>
    </article>
  `,
})
export class PageComponent implements OnInit, OnDestroy {
  private routeDataSub!: Subscription
  public page!: string
  public titleId!: string
  public bodyId!: string
  public coverImageId?: string
  public isAuthorizedToEdit = this._getIsAuthorizedToEdit()

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(OPEN_HTML_BLOG_POST_EDITOR)
    public openHtmlBlogPostEditor: OpenHtmlBlogPostEditor,
    @Inject(GET_IS_AUTHORIZED) private _getIsAuthorizedToEdit: GetIsAuthorized,
  ) {}

  public ngOnInit() {
    this.routeDataSub = this.route.data.pipe(first()).subscribe((data) => {
      this.page = data.page
      this.titleId = data.titleId
      this.bodyId = data.bodyId
      this.coverImageId = data.coverImageId
      if (!this.titleId || !this.bodyId) {
        console.log(
          "Page route configuration requires both data.titleId and data.bodyId.",
        )
        this.router.navigateByUrl("/")
      }
    })
  }

  public ngOnDestroy() {
    if (this.routeDataSub) this.routeDataSub.unsubscribe()
  }
}
