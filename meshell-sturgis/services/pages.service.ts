import { HttpErrorResponse } from "@angular/common/http"
import { Inject, Injectable } from "@angular/core"
import { ListHtmlBlogPosts } from "@funk/blog/infrastructure/external/cloud-functions/list-html-blog-posts"
import { LIST_HTML_BLOG_POSTS } from "@funk/blog/infrastructure/external/tokens"
import { ContentHtmlBlogPost } from "@funk/content/model/content"
import { DEFAULT_PAGINATION_TAKE_ALL } from "@funk/persistence/model/pagination"
import { Observable, Subject } from "rxjs"

@Injectable({ providedIn: "root" })
export class PagesService {
  public get$: Observable<ContentHtmlBlogPost[]>
  public getError$!: Observable<HttpErrorResponse>
  public getOne$: Observable<ContentHtmlBlogPost>
  public getOneError$!: Observable<HttpErrorResponse>

  private getSubject = new Subject<ContentHtmlBlogPost[]>()
  private getErrorSubject = new Subject<HttpErrorResponse>()
  private getOneSubject = new Subject<ContentHtmlBlogPost>()
  private getOneErrorSubject = new Subject<HttpErrorResponse>()

  public constructor(
    @Inject(LIST_HTML_BLOG_POSTS) private _listHtmlBlogPosts: ListHtmlBlogPosts,
  ) {
    this.get$ = this.getSubject.asObservable()
    this.getError$ = this.getErrorSubject.asObservable()
    this.getOne$ = this.getOneSubject.asObservable()
    this.getOneError$ = this.getOneErrorSubject.asObservable()
  }

  public get(taxonomyTermId?: number): void {
    this._listHtmlBlogPosts({
      pagination: DEFAULT_PAGINATION_TAKE_ALL,
      conditions: [
        ["taxonomyTerms", "array-contains", "pages"],
        ["taxonomyTerms", "array-contains", taxonomyTermId],
      ],
    })
      .then((pages) => {
        this.getSubject.next(pages)
      })
      .catch((error) => {
        this.getErrorSubject.next(error)
      })
  }

  public getOne(id?: number): void {
    this._listHtmlBlogPosts({
      pagination: DEFAULT_PAGINATION_TAKE_ALL,
      conditions: [
        ["taxonomyTerms", "array-contains", "pages"],
        ["id", "==", id],
      ],
    })
      .then(([page]) => {
        this.getOneSubject.next(page)
      })
      .catch((error) => {
        this.getOneErrorSubject.next(error)
      })
  }

  public getOneBySlug(slug?: string): void {
    this._listHtmlBlogPosts({
      pagination: DEFAULT_PAGINATION_TAKE_ALL,
      conditions: [
        ["taxonomyTerms", "array-contains", "pages"],
        ["slug", "==", slug],
      ],
    })
      .then(([page]) => {
        this.getOneSubject.next(page)
      })
      .catch((error) => {
        this.getOneErrorSubject.next(error)
      })
  }
}