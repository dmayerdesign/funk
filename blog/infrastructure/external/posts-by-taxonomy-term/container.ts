import { Component, Inject, Input, OnInit } from "@angular/core"
import { ContentHtmlBlogPost } from "@funk/admin/content/model/content"
import { ListHtmlBlogPosts } from "@funk/blog/infrastructure/external/cloud-functions/list-html-blog-posts"
import { LIST_HTML_BLOG_POSTS } from "@funk/blog/infrastructure/external/tokens"
import { DEFAULT_PAGINATION } from "@funk/persistence/model/pagination"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"

@Component({
  selector: "blog-posts-by-taxonomy-term",
  template: `
    <ion-grid class="posts max-width-container">
      <ion-row>
        <ng-container *ngFor="let post of posts | async">
          <ion-col sizeXs="12" sizeSm="6" sizeMd="6" sizeLg="4" sizeXl="4">
            <ion-card class="card" ripple-container>
              <div
                class="card-media card-media-background-image"
                [style.background-image]="post.coverImageUrl"
              ></div>

              <ion-card-header class="card-header">
                <ion-card-title class="card-title">{{
                  post.title
                }}</ion-card-title>
              </ion-card-header>

              <ion-card-content
                class="card-content"
                [innerHTML]="post.value || ''"
              >
              </ion-card-content>

              <ion-ripple-effect class="ripple-effect"></ion-ripple-effect>
            </ion-card>
          </ion-col>
        </ng-container>
      </ion-row>
    </ion-grid>
  `,
})
export class BlogPostsByTaxonomyTermContainer implements OnInit {
  @Input() public taxonomyTerm!: TaxonomyTerm
  public posts!: Promise<ContentHtmlBlogPost[]>

  public constructor(
    @Inject(LIST_HTML_BLOG_POSTS)
    private _listHtmlBlogPosts: ListHtmlBlogPosts,
  ) {}

  public ngOnInit(): void {
    this.posts = this._listHtmlBlogPosts({
      pagination: DEFAULT_PAGINATION,
      conditions: [["taxonomyTerms", "array-contains", this.taxonomyTerm.id]],
    })
  }
}
