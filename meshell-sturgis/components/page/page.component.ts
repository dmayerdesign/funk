import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { Subscription } from "rxjs"
import { first } from "rxjs/operators"
import { CacheService } from "../../services/cache.service"
import { PagesService } from "../../services/pages.service"
import { UiService } from "../../services/ui.service"

@Component({
  selector: "ms-page",
  template: `
    <header class="page-title">
      <h1
        *ngIf="page?.title"
        class="display-heading-{{ page?.slug }}"
        [innerHTML]="page.title.rendered + '.'"
      ></h1>
    </header>

    <article
      class="main-content"
      [innerHTML]="page?.content?.rendered"
    ></article>
  `,
})
export class PageComponent implements OnInit, OnDestroy {
  private pagesSub!: Subscription
  private routeDataSub!: Subscription
  public page: any

  public constructor(
    private ui: UiService,
    private pages: PagesService,
    private cache: CacheService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.routeDataSub = this.route.data.pipe(first()).subscribe((data) => {
      if (data && data.page) {
        this.getPage(data.page)
      } else {
        this.router.navigateByUrl("/")
      }
    })
  }

  public ngOnDestroy() {
    if (this.pagesSub) this.pagesSub.unsubscribe()
    if (this.routeDataSub) this.routeDataSub.unsubscribe()
  }

  public getPage(slug: string) {
    if (this.cache.pages.has(slug)) {
      this.page = this.cache.pages.get(slug)
      setTimeout(() => this.ui.transition$.next(false))
      return
    }

    this.pages.getOneBySlug(slug)
    this.pagesSub = this.pages.getOne$.subscribe((page) => {
      this.page = page
      setTimeout(() => this.ui.transition$.next(false))
      if (!this.page || !this.page.content) return
      this.cache.pages.set(slug, this.page)
    })
  }
}
