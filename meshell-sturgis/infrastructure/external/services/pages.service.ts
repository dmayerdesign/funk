import { HttpClient } from "@angular/common/http"
import { HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { ConfigService } from "./config.service"
import { UiService } from "./ui.service"

@Injectable({ providedIn: "root" })
export class PagesService {
  private endpoint: string

  public get$: Observable<any[]>
  public getError$: Observable<HttpErrorResponse>
  public getOne$: Observable<any>
  public getOneError$: Observable<HttpErrorResponse>

  private getSubject = new Subject<any[]>()
  private getErrorSubject = new Subject<HttpErrorResponse>()
  private getOneSubject = new Subject<any>()
  private getOneErrorSubject = new Subject<HttpErrorResponse>()

  constructor(
    private http: HttpClient,
    private ui: UiService,
    private cs: ConfigService,
  ) {
    this.endpoint = this.cs.constants.ENDPOINTS.PAGES
    this.get$ = this.getSubject.asObservable()
    this.getOne$ = this.getOneSubject.asObservable()
  }

  get(categoryId?: number): void {
    this.http
      .get(
        `${this.cs.config.rootPath}/${this.endpoint}?_embed=true&categories=${categoryId}`,
      )
      .subscribe(
        (pages: any[]) => {
          this.getSubject.next(pages)
        },
        (error: HttpErrorResponse) => {
          this.getErrorSubject.next(error)
        },
      )
  }

  getOne(id?: number): void {
    this.http
      .get(`${this.cs.config.rootPath}/${this.endpoint}/${id}`)
      .subscribe(
        (post: any) => {
          this.getOneSubject.next(post)
        },
        (error: HttpErrorResponse) => {
          this.getOneErrorSubject.next(error)
        },
      )
  }

  getOneBySlug(slug?: string): void {
    this.http
      .get(
        `${this.cs.config.rootPath}/${this.endpoint}?_embed=true&slug=${slug}`,
      )
      .subscribe(
        (pages: any[]) => {
          this.getOneSubject.next(pages[0])
        },
        (error: HttpErrorResponse) => {
          this.getOneErrorSubject.next(error)
        },
      )
  }
}
