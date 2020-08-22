import { Component } from "@angular/core"

@Component({
  template: `
    <ion-content class="poetry-route" style="--background: transparent">
      <article class="poetry-route-inner">
        <managed-content contentId="poetry-about-article"></managed-content>
      </article>
    </ion-content>
  `,
})
export class AboutContainer
{ }
