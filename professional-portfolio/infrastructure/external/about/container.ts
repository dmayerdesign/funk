import { Component, Inject } from "@angular/core"
import { PageTitle } from "@funk/ui/atlas/application/external/page-title"
import { PAGE_TITLE } from "@funk/ui/infrastructure/external/tokens"

@Component({
  template: `
    <ion-content
      class="content professional-portfolio-route"
      style="--background: transparent"
    >
      <article class="professional-portfolio-route-inner">
        <page-title-heading></page-title-heading>
        <content contentId="professional-portfolio-about-article"></content>
      </article>
    </ion-content>
  `,
})
export class AboutContainer {
  public constructor(@Inject(PAGE_TITLE) public pageTitle: PageTitle) {}
}
