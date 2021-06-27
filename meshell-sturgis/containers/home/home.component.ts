import { Component, Inject, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { GetById } from "@funk/content/application/external/behaviors/persistence/get-by-id"
import { GET_CONTENT_BY_ID } from "@funk/content/infrastructure/external/persistence/tokens"
import { CacheService } from "../../services/cache.service"
import { UiService } from "../../services/ui.service"

@Component({
  selector: "ms-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public bannerUrl!: string
  private rectangleTestSequence: number[] = []

  public constructor(
    public ui: UiService,
    public cache: CacheService,
    private router: Router,
    @Inject(GET_CONTENT_BY_ID) private getContentById: GetById,
  ) {}

  public ngOnInit() {
    this.bannerUrl = "/assets/meshell-sturgis/images/home-banner.png"
    this.setRectangleTestSequence()

    if (!this.cache.homeTagline) {
      const canary = this.getContentById("home-tagline")
      canary.then((x) => {
        this.ui.transition$.next(false)
      })
    } else {
      setTimeout(() => this.ui.transition$.next(false))
    }
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
