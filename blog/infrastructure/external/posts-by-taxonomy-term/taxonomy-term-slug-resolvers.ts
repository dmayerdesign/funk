import { Inject, Injectable } from "@angular/core"
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router"
import { GetTaxonomyTermBySlug } from "@funk/blog/infrastructure/external/cloud-functions/get-taxonomy-term-by-slug"
import { GET_TAXONOMY_TERM_BY_SLUG } from "@funk/blog/infrastructure/external/tokens"
import { TaxonomyTerm, TAXONOMY_TERM } from "@funk/taxonomy/model/taxonomy-term"
import { LoadingController } from "@ionic/angular"

@Injectable()
export class TaxonomyTermSlugRouteParamResolver
  implements Resolve<TaxonomyTerm> {
  public constructor(
    @Inject(GET_TAXONOMY_TERM_BY_SLUG)
    private _getTaxonomyTermBySlug: GetTaxonomyTermBySlug,
    private _loadingController: LoadingController,
  ) {}

  public async resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Promise<TaxonomyTerm> {
    const loading = await this._loadingController.create({
      id: "taxonomy-term-loading",
    })
    loading.present()
    const slug = route.paramMap.get(TAXONOMY_TERM)
    const taxonomyTerm = await this._getTaxonomyTermBySlug(slug)
    this._loadingController.dismiss("taxonomy-term-loading")
    return taxonomyTerm
  }
}
