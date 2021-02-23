import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { ConfigService } from '../../services/config.service';
import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'ms-post',
  template: `
    <header class="page-title">
        <h1 class="display-heading-{{post?.slug}}" [innerHTML]="post?.title?.rendered"></h1>
        <ms-back-btn routeUrl="{{cs.config.rootPath}}/{{category?.slug}}"></ms-back-btn>
    </header>

    <article class="main-content" [innerHTML]="post?.content?.rendered"></article>
  `,
})
export class PostComponent implements OnInit, OnDestroy {

  public post: any;
  public category: any;
  private categorySub: Subscription;
  private postsSub: Subscription;
  private paramsSub: Subscription;

  constructor(
    public ui: UiService,
    public cs: ConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private categories: CategoriesService,
    private posts: PostsService,
  ) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      if (params.post) {
        this.posts.getOneBySlug(params.post);
        this.postsSub = this.posts.getOne$.subscribe(post => {
          this.post = post;
          this.categories.getById(post.categories[0]).subscribe(category => {
            this.category = category;
          });
          setTimeout(() => this.ui.transition$.next(false));
        });
      }
      else {
        this.router.navigateByUrl(this.cs.config.rootPath);
      }
    });
  }

  ngOnDestroy() {
    if (this.categorySub) this.categorySub.unsubscribe();
    if (this.postsSub) this.postsSub.unsubscribe();
    if (this.paramsSub) this.paramsSub.unsubscribe();
  }

}
