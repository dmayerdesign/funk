import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Cart } from '@funk/shared/contracts/cart/cart'
import { mapTo } from 'rxjs/operators'
import { StateManager } from 'ui/state/state-manager'
import { environment } from '../../environments/environment'

export interface ShopState {
  cart: Cart
}

export const shopInitialState: ShopState = {
  cart: {
    products: []
  }
}

@Injectable({providedIn: 'root'})
export class ShopActions {
  constructor(
    private _behaviorManager: StateManager<ShopState>,
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

  // public loadWishlist(): void { }
  // public checkout(): void { }
  // public createWishlist(): void { }
  // public listProducts(): void { }
  // public listWishlists(): void { }
  // public updateProductQuantityInCart(): void { }
  // public updateProductQuantityInWishlist(): void { }
}
