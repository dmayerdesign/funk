import { Inject, Injectable } from "@angular/core"
import { GetTaxonomyTermBySlug } from "@funk/blog/infrastructure/external/cloud-functions/get-taxonomy-term-by-slug"
import { ListTaxonomyTerms } from "@funk/blog/infrastructure/external/cloud-functions/list-taxonomy-terms"
import {
  GET_TAXONOMY_TERM_BY_SLUG,
  LIST_TAXONOMY_TERMS,
} from "@funk/blog/infrastructure/external/tokens"
import { DEFAULT_PAGINATION_TAKE_ALL } from "@funk/persistence/model/pagination"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"
import { from, Observable } from "rxjs"

@Injectable({ providedIn: "root" })
export class CategoriesService {
  public constructor(
    @Inject(GET_TAXONOMY_TERM_BY_SLUG)
    private _getTaxonomyTermBySlug: GetTaxonomyTermBySlug,
    @Inject(LIST_TAXONOMY_TERMS)
    private _listTaxonomyTerms: ListTaxonomyTerms,
  ) {}

  public getOne(categorySlug: string): Observable<TaxonomyTerm> {
    return from(this._getTaxonomyTermBySlug(categorySlug))
  }

  public getById(categoryId: string | number): Observable<TaxonomyTerm> {
    return from(
      this._listTaxonomyTerms({
        pagination: DEFAULT_PAGINATION_TAKE_ALL,
        conditions: [["id", "==", categoryId]],
      }).then(([taxonomyTerm]) => taxonomyTerm),
    )
  }

  public getIdOf(categorySlug: string): Observable<string | number> {
    return from(
      this._listTaxonomyTerms({
        pagination: DEFAULT_PAGINATION_TAKE_ALL,
        conditions: [["slug", "==", categorySlug]],
      }).then(([taxonomyTerm]) => taxonomyTerm.id),
    )
  }

  public getIdsOf(categorySlugs: string[]): Observable<(string | number)[]> {
    return from(
      this._listTaxonomyTerms({
        pagination: DEFAULT_PAGINATION_TAKE_ALL,
        conditions: [["slug", "in", categorySlugs]],
      }).then((taxonomyTerms) => taxonomyTerms.map(({ id }) => id)),
    )
  }

  public getAllButHome(): Observable<TaxonomyTerm[]> {
    return from(
      this._listTaxonomyTerms({
        pagination: DEFAULT_PAGINATION_TAKE_ALL,
        conditions: [],
      }).then((taxonomyTerms) =>
        taxonomyTerms.filter(({ slug }) => slug !== "home"),
      ),
    )
  }
}
