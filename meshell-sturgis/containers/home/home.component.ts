import { Component, OnDestroy, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Subscription } from "rxjs"
import { first } from "rxjs/operators"
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
    this.getRectangleTestSequence()

    if (!this.cache.homeTagline) {
      this.posts.getOneBySlug("home-tagline")
      this.taglinePostSub = this.posts.getOne$
        .pipe(first())
        .subscribe((taglinePost) => {
          this.post = taglinePost
          if (!this.post || !this.post.content) {
            setTimeout(() => this.ui.transition$.next(false))
            return
          }
          this.cache.homeTagline = this.post.content.rendered
          setTimeout(() => this.ui.transition$.next(false))
        })
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

  public getRectangleTestSequence() {
    for (let n = 1; n < 100; n++) {
      this.rectangleTestSequence.push(0.5 * (10 * n + Math.pow(-1, n + 1) - 7))
    }
  }
  public isRectangle(index: number): boolean {
    return this.rectangleTestSequence.indexOf(index + 1) > -1
  }
}
