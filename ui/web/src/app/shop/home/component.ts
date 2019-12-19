import { Component } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { FormControl, FormGroup } from '@angular/forms'
import { Address } from '@funk/model/address/address'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { first } from 'rxjs/operators'
import { IdentityApi } from '../../identity/api'
import { NAVBAR_HEIGHT_PX } from '../config'

@Component({
  template: `
    <div id="home-inner"
      fxLayout="column"
      fxFlexFill>
      <div class="home-banner"
        [ngStyle]="{
          height: 'calc(100vh - ' + navbarHeight + ')'
        }">
        <form [formGroup]="loginFormGroup"
          (ngSubmit)="handleLoginSubmit()"
          fxLayout fxLayoutGap="10px">
          <input formControlName="email" placeholder="email" type="email" />
          <input formControlName="password" placeholder="password" type="password" />
          <input type="submit" style="visibility: hidden" />
        </form>
        <button (click)="seedOrder()">Seed order</button>
      </div>
    </div>
  `,
})
export class HomeComponent
{
  public navbarHeight = NAVBAR_HEIGHT_PX + 'px'
  public loginFormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  constructor(
    private _identityApi: IdentityApi,
    private _firestore: AngularFirestore
  )
  { }

  public async handleLoginSubmit(): Promise<void>
  {
    console.log(await this._identityApi.signInWithEmailAndPassword(
      this.loginFormGroup.get('email')!.value,
      this.loginFormGroup.get('password')!.value,
    ))
  }

  public async seedOrder(): Promise<void>
  {
    await this._firestore.doc(`${ORDERS}/1`).set({
      id: '1', // docRef.id,
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
      status: Status.PENDING,
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
    this._firestore.collection(ORDERS).valueChanges()
      .pipe(first())
      .subscribe(console.log)
  }
}
