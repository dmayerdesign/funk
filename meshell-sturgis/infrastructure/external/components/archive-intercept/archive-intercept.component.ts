import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'ms-archive-intercept',
  template: ``,
})
export class ArchiveInterceptComponent implements OnInit, OnDestroy {

  public post: any;
  public category: any;
  private postsSub: Subscription;
  private paramsSub: Subscription;

  constructor(
    public ui: UiService,
    public cs: ConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private posts: PostsService,
  ) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      if (params.postId) {
        this.posts.getOne(params.postId);
        this.postsSub = this.posts.getOne$.subscribe(post => {
          this.router.navigateByUrl(this.cs.config.rootPath + "/posts/" + post.slug)
        });
      }
      else {
        this.router.navigateByUrl(this.cs.config.rootPath);
      }
    });
  }

  ngOnDestroy() {
    if (this.postsSub) this.postsSub.unsubscribe();
    if (this.paramsSub) this.paramsSub.unsubscribe();
  }

}
