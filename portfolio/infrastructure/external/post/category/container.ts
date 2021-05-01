import { Component, Inject, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { OpenHtmlBlogPostAdder } from "@funk/admin/content/application/external/editor/behaviors/open-html-blog-post-adder"
import { OPEN_HTML_BLOG_POST_ADDER } from "@funk/admin/content/infrastructure/external/editor/tokens"
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
              (click)="
                openHtmlBlogPostAdder({
                  taxonomyTerms: [taxonomyTerm.id]
                })
              "
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
})
export class PostCategoryContainer implements OnInit {
  public taxonomyTerm!: TaxonomyTerm

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    @Inject(OPEN_HTML_BLOG_POST_ADDER)
    public openHtmlBlogPostAdder: OpenHtmlBlogPostAdder,
  ) {}

  public ngOnInit(): void {
    this.taxonomyTerm = this._activatedRoute.snapshot.data.taxonomyTerm
    if (!this.taxonomyTerm) {
      this._router.navigateByUrl("/not-found")
    }
  }
}
