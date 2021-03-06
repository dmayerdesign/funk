import { Component, Inject, Input, OnInit } from "@angular/core"
import { ListHtmlBlogPosts } from "@funk/blog/infrastructure/external/cloud-functions/list-html-blog-posts"
import { LIST_HTML_BLOG_POSTS } from "@funk/blog/infrastructure/external/tokens"
import { GetIsAuthorized } from "@funk/content/application/external/editor/behaviors/get-is-authorized"
import { OpenHtmlBlogPostEditor } from "@funk/content/application/external/editor/behaviors/open-html-blog-post-editor"
import {
  GET_IS_AUTHORIZED,
  OPEN_HTML_BLOG_POST_EDITOR,
} from "@funk/content/infrastructure/external/editor/tokens"
import { ContentHtmlBlogPost } from "@funk/content/model/content"
import { DEFAULT_PAGINATION } from "@funk/persistence/model/pagination"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"

@Component({
  selector: "blog-posts-by-taxonomy-term",
  template: `
    <ion-grid class="posts grid max-width-container">
      <ion-row class="row">
        <ng-container *ngFor="let post of posts | async">
          <ion-col
            class="post post-col content col"
            sizeXs="12"
            sizeSm="12"
            sizeMd="12"
            sizeLg="12"
            sizeXl="12"
          >
            <blog-post-card [post]="post"></blog-post-card>

            <ng-container *ngIf="getIsAuthorized() | async">
              <ion-button
                class="edit-post-button edit-button button"
                (click)="editAPost(post)"
              >
                <ion-icon
                  class="icon"
                  lazy="true"
                  slot="icon-only"
                  name="create-sharp"
                ></ion-icon>
              </ion-button>
            </ng-container>
          </ion-col>
        </ng-container>
      </ion-row>
    </ion-grid>
  `,
  styles: [
    `
      .posts {
        padding-left: 0;
        padding-right: 0;
      }

      .posts .row {
        margin-left: -11px;
        margin-right: -11px;
      }
    `,
  ],
})
export class BlogPostsByTaxonomyTermContainer implements OnInit {
  @Input() public taxonomyTerm!: TaxonomyTerm
  public posts!: Promise<ContentHtmlBlogPost[]>

  public constructor(
    @Inject(LIST_HTML_BLOG_POSTS)
    private _listHtmlBlogPosts: ListHtmlBlogPosts,
    @Inject(OPEN_HTML_BLOG_POST_EDITOR)
    public openHtmlBlogPostEditor: OpenHtmlBlogPostEditor,
    @Inject(GET_IS_AUTHORIZED)
    public getIsAuthorized: GetIsAuthorized,
  ) {}

  public loadPosts(): void {
    this.posts = this._listHtmlBlogPosts({
      pagination: DEFAULT_PAGINATION,
      conditions: [["taxonomyTerms", "array-contains", this.taxonomyTerm.id]],
    })
  }

  public ngOnInit(): void {
    this.loadPosts()
    this.posts.then(async () => {
      // FIXME: for some reason, Ionic doesn't want to render everything in the list.
      // Firing a bunch of resize events is a hack to make sure everything renders for now.
      let allPostsHaveRendered = false
      let retries = 20
      while (allPostsHaveRendered === false && retries > 0) {
        await new Promise((resolve) =>
          setTimeout(() => {
            window.dispatchEvent(new Event("resize"))
            allPostsHaveRendered = Array.from(
              document.querySelectorAll(".card-title"),
            ).every(
              (cardTitleElement) => !!cardTitleElement.textContent?.length,
            )
            --retries
            resolve(undefined)
          }),
        )
      }
    })
  }

  public async editAPost(post: ContentHtmlBlogPost): Promise<void> {
    await this.openHtmlBlogPostEditor({ id: post.id })
  }
}
