import { Component, Inject } from '@angular/core'
import { Address } from '@funk/model/address/address'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { PersistenceApi } from '@funk/ui/core/persistence/api'
import { Persistence } from '@funk/ui/core/persistence/interface'

@Component({
  selector: 'kitchen-sink',
  template: `
    <ion-text>
      <h3>Kitchen Sink</h3>
    </ion-text>

    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        <ion-card-title>Card Title</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        Keep close to Nature's heart... and break clear away, once in awhile,
        and climb a mountain or spend a week in the woods. Wash your spirit clean.
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-item>
        <ion-icon name="pin" slot="start"></ion-icon>
        <ion-label>ion-item in a card, icon left, button right</ion-label>
        <ion-button fill="outline" slot="end">View</ion-button>
      </ion-item>

      <ion-card-content>
        This is content, without any paragraph or header tags,
        within an ion-card-content element.
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-item href="#" class="ion-activated">
        <ion-icon name="wifi" slot="start"></ion-icon>
        <ion-label>Card Link Item 1 activated</ion-label>
      </ion-item>

      <ion-item href="#">
        <ion-icon name="wine" slot="start"></ion-icon>
        <ion-label>Card Link Item 2</ion-label>
      </ion-item>

      <ion-item class="ion-activated">
        <ion-icon name="warning" slot="start"></ion-icon>
        <ion-label>Card Button Item 1 activated</ion-label>
      </ion-item>

      <ion-item>
        <ion-icon name="walk" slot="start"></ion-icon>
        <ion-label>Card Button Item 2</ion-label>
      </ion-item>
    </ion-card>

    <ion-button (click)="seedOrder()">Seed order</ion-button>
  `,
})
export class KitchenSinkComponent
{
  constructor(
    @Inject(PersistenceApi) private _persistenceApi: Persistence
  )
  { }

  public async updateCart(): Promise<void>
  {
  }

  public async seedOrder(): Promise<void>
  {
    const id = Date.now().toString()
    await this._persistenceApi.setById<Order>(ORDERS, id, {
      id,
      customer: {
        userId: 'ArSkuvU2l8fbIphhNeyzhjSNyDx1',
        id: 'test-customer',
        email: '',
        firstName: '',
        lastName: '',
        shippingAddress: {} as Address,
        billingAddress: {} as Address,
        savePaymentInfo: false,
        idForPayment: '',
      },
      paymentMethod: '',
      skus: [ 'test-sku-1' ],
      status: Status.CART,
      subTotal: {
        amount: 0,
        currency: 'USD',
      },
      taxPercent: 0,
      total: {
        amount: 0,
        currency: 'USD',
      },
    } as Order)
  }
}
