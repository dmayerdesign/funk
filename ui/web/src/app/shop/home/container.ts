import { Component } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Address } from '@funk/model/address/address'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'

@Component({
  template: `
    <!--
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Home</ion-title>
        <ion-buttons slot="end">
          <ion-button [routerLink]="['/new-item']">
            <ion-icon slot="icon-only" name="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content padding>
      <ion-list>
        <ion-item *ngFor="let item of items" [routerLink]="['/update-item', item.id]">
          <ion-label>
            {{ item.title }}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    -->

    <ion-text>
      <h3>Home</h3>
    </ion-text>
    <ion-button (click)="seedOrder()">Seed order</ion-button>
    <ion-button (click)="seedOrder()">Seed order</ion-button>
  `,
})
export class HomeContainer
{
  constructor(
    private _firestore: AngularFirestore,
  )
  { }

  public async updateCart(): Promise<void>
  {
  }

  public async seedOrder(): Promise<void>
  {
    const id = Date.now().toString()
    await this._firestore.doc(`${ORDERS}/${id}`).set({
      id,
      customer: {
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
      status: Status.PAYMENT_PENDING,
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
