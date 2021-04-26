import { Inject, Injectable } from "@angular/core"
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router"
import { GetTaxonomyTermBySlug } from "@funk/blog/infrastructure/external/cloud-functions/get-taxonomy-term-by-slug"
import { GET_TAXONOMY_TERM_BY_SLUG } from "@funk/blog/infrastructure/external/tokens"
import { TaxonomyTerm, TAXONOMY_TERM } from "@funk/taxonomy/model/taxonomy-term"

@Injectable()
export class TaxonomyTermSlugRouteParamResolver
  implements Resolve<TaxonomyTerm> {
  public constructor(
    @Inject(GET_TAXONOMY_TERM_BY_SLUG)
    private _getTaxonomyTermBySlug: GetTaxonomyTermBySlug,
  ) {}

  public async resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Promise<TaxonomyTerm> {
    const slug = route.paramMap.get(TAXONOMY_TERM)
    const taxonomyTerm = await this._getTaxonomyTermBySlug(slug)
    console.log("got a tax term!", taxonomyTerm)
    return taxonomyTerm
  }
}
