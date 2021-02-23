import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';
import { ConfigService } from '../../services/config.service';
import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'ms-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

    public category: any;
    public posts$: Observable<any[]>;
    public routeDataSub: Subscription;
    public categorySub: Subscription;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private ui: UiService,
      public cs: ConfigService,
      private categories: CategoriesService,
      private posts: PostsService,
    ) { }

    ngOnInit() {
      this.routeDataSub = this.route.data.pipe(first()).subscribe(
        data => {
          if (data && data.category) {

            this.categorySub = this.categories.getOne(data.category).subscribe(category => {
              this.category = category;
              if (!category) {
                setTimeout(() => this.ui.transition$.next(false));
                this.router.navigateByUrl(this.cs.config.rootPath);
                return;
              }
              this.posts.get(category.id);
              this.posts$ = this.posts.get$.pipe(
                tap(() => setTimeout(() => this.ui.transition$.next(false)))
              );
            });
          }
          else if (data && data.category && data.category !== "home") {
            this.router.navigateByUrl(this.cs.config.rootPath + "/" + data.category);
          }
          else {
            this.router.navigateByUrl(this.cs.config.rootPath);
          }
        }
      );
    }

    ngOnDestroy() {
      if (this.routeDataSub) this.routeDataSub.unsubscribe();
      if (this.categorySub) this.categorySub.unsubscribe();
    }

    goToPost(slug: string) {
      this.router.navigateByUrl(this.cs.config.rootPath + "/posts/" + slug);
    }

    handlePostKeyup(e: KeyboardEvent, slug: string) {
      if (e.which === 32 || e.which === 13) {
        this.router.navigateByUrl(this.cs.config.rootPath + '/posts/' + slug);
      }
    }
}
