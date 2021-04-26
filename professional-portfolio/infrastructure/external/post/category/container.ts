import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"

@Component({
  selector: "post-category",
  template: `
    <ion-content
      class="content professional-portfolio-route"
      style="--background: transparent"
    >
      <article class="professional-portfolio-route-inner">
        <page-title-heading></page-title-heading>

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
  ) {}

  public ngOnInit(): void {
    this.taxonomyTerm = this._activatedRoute.snapshot.data.taxonomyTerm
    if (!this.taxonomyTerm) {
      this._router.navigateByUrl("/not-found")
    }
  }
}
