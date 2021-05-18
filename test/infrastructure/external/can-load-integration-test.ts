import { Injectable } from "@angular/core"
import { CanLoad, Router, UrlTree } from "@angular/router"
import { INTEGRATION_TEST } from "@funk/configuration"

@Injectable()
export class CanLoadIntegrationTest implements CanLoad {
  public constructor(private _router: Router) {}

  public canLoad(): boolean | UrlTree {
    return INTEGRATION_TEST || this._router.parseUrl("/not-found")
  }
}
