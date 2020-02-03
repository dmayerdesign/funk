import { Component } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { FormControl, FormGroup } from '@angular/forms'
import { Address } from '@funk/model/address/address'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { IdentityApi } from '@funk/ui/web/app/identity/api'
import { NAVBAR_HEIGHT_PX } from '@funk/ui/web/app/shop/config'
import { interval, of } from 'rxjs'
import { first, switchMap, take } from 'rxjs/operators'

@Component({
  template: `
    <div id="home-inner"
      fxLayout="column"
      fxFlexFill>
      <div class="home-banner"
        [ngStyle]="{
          height: 'calc(100vh - ' + navbarHeight + ')'
        }">

        <div>
          <h2>Sign In</h2>
          <form [formGroup]="signInFormGroup"
            (ngSubmit)="handleSignInSubmit()"
            fxLayout fxLayoutGap="10px">
            <input formControlName="email" placeholder="email" type="email" />
            <input formControlName="password" placeholder="password" type="password" />
            <input type="submit" style="visibility: hidden" />
          </form>
        </div>

        <br>
        <br>

        <div>
          <h2>Sign Up</h2>
          <form [formGroup]="signUpFormGroup"
            (ngSubmit)="handleSignUpSubmit()"
            fxLayout fxLayoutGap="10px">
            <input formControlName="email" placeholder="email" type="email" />
            <input formControlName="password" placeholder="password" type="password" />
            <input type="submit" style="visibility: hidden" />
          </form>
        </div>

        <br>
        <br>

        <button (click)="seedOrder()">Seed order</button>

        <br>
        <br>

        <div>
          {{ data$ | async | json }}
        </div>
      </div>
    </div>
  `,
})
export class HomeContainer
{
  public navbarHeight = NAVBAR_HEIGHT_PX + 'px'
  public signUpFormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })
  public signInFormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })
  public data$ = interval(500).pipe(
    take(5),
    switchMap(() =>
    {
      let length = Math.ceil(Math.random() * 10) + 5
      const data = [] as any[]
      while (length >= 0)
      {
        length--
        data.push({
          someCopy: `Hello! Look at me! I have ${Math.ceil(Math.random() * 5)} apples.`,
        })
      }
      return of(data)
    })
  )

  constructor(
    private _identityApi: IdentityApi,
    private _firestore: AngularFirestore
  )
  { }

  public async handleSignUpSubmit(): Promise<void>
  {
    await this._identityApi.createUserWithEmailAndPassword(
      this.signUpFormGroup.get('email')!.value,
      this.signUpFormGroup.get('password')!.value,
    )
  }

  public async handleSignInSubmit(): Promise<void>
  {
    await this._identityApi.signInWithEmailAndPassword(
      this.signInFormGroup.get('email')!.value,
      this.signInFormGroup.get('password')!.value,
    )
  }

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
