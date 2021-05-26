import { Component, Input } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"
import { ContentHtmlBlogPost } from "@funk/admin/content/model/content"

@Component({
  selector: "blog-post-card",
  template: `
    <ion-card class="post-card card" ripple-container>
      <div
        class="post-card-media card-media card-media-background-image"
        [style]="sanitizedCoverImageStyle"
      ></div>

      <ion-card-header class="card-header">
        <ion-card-title class="post-title card-title">{{
          post.title
        }}</ion-card-title>
      </ion-card-header>

      <ion-card-content
        class="post-value card-content"
        [innerHTML]="post.value || ''"
      >
      </ion-card-content>

      <ion-ripple-effect class="ripple-effect"></ion-ripple-effect>
    </ion-card>
  `,
})
export class BlogPostCardComponent {
  @Input() public post!: ContentHtmlBlogPost
  public sanitizedCoverImageStyle!: Pick<CSSStyleDeclaration, "backgroundImage">

  public constructor(public domSanitizer: DomSanitizer) {}

  public ngOnChanges(): void {
    this.sanitizedCoverImageStyle = {
      backgroundImage: this.domSanitizer.bypassSecurityTrustStyle(
        `url(${
          this.post.coverImageGroup.images[
            this.post.coverImageGroup.largeSize
          ] ?? ""
        })`,
      ) as string,
    }
  }
}
