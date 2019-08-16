import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Cart } from '@funk/shared/contracts/cart/cart'
import { mapTo } from 'rxjs/operators'
import { BehaviorManager } from 'ui/behavior/behavior-manager'
import { environment } from '../../environments/environment'

export interface ShopState {
  cart: Cart
}

@Injectable({providedIn: 'root'})
export class ShopBehaviors {
  constructor(
    private _behaviorManager: BehaviorManager<ShopState>,
    private _httpClient: HttpClient,
  ) { }

  public loadCart(): void {
    return this._behaviorManager.dispatch({
      type: 'LOAD_CART',
      execute: (state: ShopState) => this._httpClient.get(environment.functionsUrl + '/helloWorld')
          .pipe(mapTo({ ...state, cart: { products: [] } }))
          .toPromise()
    })
  }

  public loadWishlist(): void { }
  public checkout(): void { }
  public createWishlist(): void { }
  public listProducts(): void { }
  public listWishlists(): void { }
  public updateProductQuantityInCart(): void { }
  public updateProductQuantityInWishlist(): void { }
}
