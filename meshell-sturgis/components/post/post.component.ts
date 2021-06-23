import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { ContentHtmlBlogPost } from "@funk/content/model/content"
import { Subscription } from "rxjs"
import { CategoriesService } from "../../services/categories.service"
import { PostsService } from "../../services/posts.service"
import { UiService } from "../../services/ui.service"

@Component({
  selector: "ms-post",
  template: `
    <header class="page-title">
      <h1 class="display-heading-{{ post?.slug }}">{{ post?.title }}</h1>
      <ms-back-btn routeUrl="/{{ category?.slug }}"></ms-back-btn>
    </header>

    <article class="main-content" [innerHTML]="post?.value"></article>
  `,
})
export class PostComponent implements OnInit, OnDestroy {
  public post?: ContentHtmlBlogPost
  public category: any
  private categorySub!: Subscription
  private postsSub!: Subscription
  private paramsSub!: Subscription

  public constructor(
    public ui: UiService,
    private router: Router,
    private route: ActivatedRoute,
    private categories: CategoriesService,
    private posts: PostsService,
  ) {}

  public ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params) => {
      if (params.post) {
        this.posts.getOneBySlug(params.post)
        this.postsSub = this.posts.getOne$.subscribe((post) => {
          this.post = post
          this.categorySub = this.categories
            .getById(post.taxonomyTerms[0])
            .subscribe((category) => {
              this.category = category
            })
          setTimeout(() => this.ui.transition$.next(false))
        })
      } else {
        this.router.navigateByUrl("/")
      }
    })
  }

  public ngOnDestroy() {
    if (this.categorySub) this.categorySub.unsubscribe()
    if (this.postsSub) this.postsSub.unsubscribe()
    if (this.paramsSub) this.paramsSub.unsubscribe()
  }
}
