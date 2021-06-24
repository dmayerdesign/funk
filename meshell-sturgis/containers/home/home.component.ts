import { Component, OnDestroy, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Subscription } from "rxjs"
import { CacheService } from "../../services/cache.service"
import { PostsService } from "../../services/posts.service"
import { UiService } from "../../services/ui.service"

@Component({
  selector: "ms-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  public bannerUrl!: string
  public post: any
  private homeCategorySub!: Subscription
  private taglinePostSub!: Subscription
  private rectangleTestSequence: number[] = []

  public constructor(
    public ui: UiService,
    public posts: PostsService,
    public cache: CacheService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.bannerUrl = "/assets/meshell-sturgis/images/home-banner.png"
    this.setRectangleTestSequence()

    if (!this.cache.homeTagline) {
      const canary = this.posts.getOne$
      this.taglinePostSub = canary.subscribe((x) => {
        console.log("cacaw!", x)
        this.ui.transition$.next(false)
      })
      this.posts.getOneBySlug("home-tagline")
    } else {
      setTimeout(() => this.ui.transition$.next(false))
    }
  }

  public ngOnDestroy() {
    if (this.homeCategorySub) this.homeCategorySub.unsubscribe()
    if (this.taglinePostSub) this.taglinePostSub.unsubscribe()
  }

  public handleTileClick(slug: string) {
    this.router.navigateByUrl("/" + slug)
  }

  public handleTileKeyup(e: KeyboardEvent, category: string) {
    if (e.which === 32 || e.which === 13) {
      this.router.navigateByUrl("/" + category)
    }
  }

  public setRectangleTestSequence() {
    for (let n = 1; n < 100; n++) {
      this.rectangleTestSequence.push(0.5 * (10 * n + Math.pow(-1, n + 1) - 7))
    }
  }
  public isRectangle(index: number): boolean {
    return this.rectangleTestSequence.indexOf(index + 1) > -1
  }
}
