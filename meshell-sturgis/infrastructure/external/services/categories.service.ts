import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import { ConfigService } from "./config.service"

@Injectable({ providedIn: "root" })
export class CategoriesService {
  private endpoint: string
  private excludeIds: number[] = []

  constructor(private http: HttpClient, private cs: ConfigService) {
    this.endpoint = this.cs.constants.ENDPOINTS.CATEGORIES
  }

  getOne(categorySlug: string): Observable<any> {
    let params = new HttpParams()
    params = params.append("embed", "true")
    params = params.append("slug", categorySlug)

    return this.http
      .get<any[]>(`${this.cs.config.rootPath}/${this.endpoint}`, { params })
      .pipe(map((categories) => categories[0]))
  }

  get(options?: { exclude: string[] }): Observable<any[]> {
    const exclude = options.exclude
    // let params = new HttpParams();
    let queryString = "?"

    if (exclude && exclude.length < 4) {
      return this.getIdsOf([...exclude]).pipe(
        switchMap((ids) => {
          ids.forEach((id) => {
            if (this.excludeIds.indexOf(id) === -1) {
              this.excludeIds.push(id)
              queryString += "exclude[]=" + id + "&"
              // params = params.append('exclude[]', id.toString());
            }
          })
          return this.http.get<any[]>(
            `${this.cs.config.rootPath}/${this.endpoint + queryString}`,
          )
        }),
      )
    }
  }

  getById(categoryId: number): Observable<any> {
    return this.http.get<any>(
      `${this.cs.config.rootPath}/${this.endpoint}/${categoryId}`,
    )
  }

  getIdOf(categorySlug: string): Observable<number> {
    let params = new HttpParams()
    params = params.append("embed", "true")
    params = params.append("slug", categorySlug)

    return this.http
      .get<any[]>(`${this.cs.config.rootPath}/${this.endpoint}`, { params })
      .pipe(map((categories) => (categories[0] ? categories[0].id : -1)))
  }

  getIdsOf(categorySlugs: string[]): Observable<number[]> {
    // let params = new HttpParams();
    // params = params.append('embed', 'true');
    let queryString = ""

    categorySlugs.forEach((slug) => {
      queryString += "&slug[]=" + slug
      // params = params.append('slug[]', slug);
    })

    return this.http
      .get<any[]>(
        `${this.cs.config.rootPath}/${this.endpoint}?embed=true${queryString}`,
      )
      .pipe(map((categories) => categories.map((c) => c.id)))
  }

  getAllButHome(): Observable<any[]> {
    let params = new HttpParams()

    return this.getIdOf("home").pipe(
      switchMap((id) => {
        params = params.append("exclude[]", id.toString())
        return this.http.get<any[]>(
          `${this.cs.config.rootPath}/${this.endpoint}`,
          { params },
        )
      }),
    )
  }
}
