import { Component, OnInit } from "@angular/core"
import { Content } from "@funk/admin/content/model/content"
// import { LIST_POSTS_BY_TAXONOMY } from "@funk/professional-portfolio/infrastructure/external/tokens"

@Component({
  template: `
    <ion-content
      class="content professional-portfolio-route"
      style="--background: transparent"
    >
      <article class="professional-portfolio-route-inner">
        <page-title-heading></page-title-heading>

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

                  <!-- <ion-card-content class="card-content"></ion-card-content> -->

                  <ion-ripple-effect class="ripple-effect"></ion-ripple-effect>
                </ion-card>
              </ion-col>
            </ng-container>
          </ion-row>
        </ion-grid>
      </article>
    </ion-content>
  `,
})
export class BlogContainer implements OnInit {
  public posts!: Promise<Content[]>

  public constructor() {} // @Inject(LIST_POSTS_BY_TAXONOMY) public listPostsByTaxonomy: ListPostsByTaxonomy

  public ngOnInit(): void {
    // this.posts = this.listPostsByTaxonomy("blog")
  }
}
