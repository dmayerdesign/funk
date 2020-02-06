import { Component } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Address } from '@funk/model/address/address'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { first } from 'rxjs/operators'

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

    <h3>Home</h3>
    <button (click)="seedOrder()">Seed order</button>
  `,
})
export class HomeContainer
{
  constructor(
    private _firestore: AngularFirestore,
  )
  { }

  public async seedOrder(): Promise<void>
  {
    this._firestore.collection(ORDERS).valueChanges()
      .pipe(first())
      .subscribe(console.log)

    await this._firestore.doc(`${ORDERS}/1`).set({
      id: '1',
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
