import { Component, Inject, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { OpenHtmlBlogPostEditor } from "@funk/admin/content/application/external/editor/behaviors/open-html-blog-post-editor"
import { OPEN_HTML_BLOG_POST_EDITOR } from "@funk/admin/content/infrastructure/external/editor/tokens"
import { BlogPostsByTaxonomyTermContainer } from "@funk/blog/infrastructure/external/posts-by-taxonomy-term/container"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"

@Component({
  selector: "post-category",
  template: `
    <ion-content
      class="content portfolio-route"
      style="--background: transparent"
    >
      <article class="portfolio-route-inner">
        <page-title-heading>
          <ng-template #after>
            <ion-button
              class="button add-post-button"
              (click)="openBlogPostEditor()"
            >
              Add a post
            </ion-button>
          </ng-template>
        </page-title-heading>

        <blog-posts-by-taxonomy-term
          [taxonomyTerm]="taxonomyTerm"
        ></blog-posts-by-taxonomy-term>
      </article>
    </ion-content>
  `,
  styles: [
    `
      .add-post-button {
        --background: var(--ion-color-tertiary);
      }
    `,
  ],
})
export class PostCategoryContainer implements OnInit {
  @ViewChild(BlogPostsByTaxonomyTermContainer)
  public blogPostsByTaxonomyTerm!: BlogPostsByTaxonomyTermContainer
  public taxonomyTerm!: TaxonomyTerm

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    @Inject(OPEN_HTML_BLOG_POST_EDITOR)
    public openHtmlBlogPostEditor: OpenHtmlBlogPostEditor,
  ) {}

  public ngOnInit(): void {
    this.taxonomyTerm = this._activatedRoute.snapshot.data.taxonomyTerm
    if (!this.taxonomyTerm) {
      this._router.navigateByUrl("/not-found")
    }
  }

  public async openBlogPostEditor(): Promise<void> {
    await this.openHtmlBlogPostEditor({
      contentData: {
        taxonomyTerms: [this.taxonomyTerm.id],
      },
    })
  }
}
