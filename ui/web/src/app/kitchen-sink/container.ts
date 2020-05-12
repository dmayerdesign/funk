import { Component, Inject, OnInit, Renderer2 } from '@angular/core'
import { Address } from '@funk/model/address/address'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { Persistence, PERSISTENCE } from '@funk/ui/core/persistence/interface'
import { timer, BehaviorSubject } from 'rxjs'

@Component({
  selector: 'kitchen-sink',
  template: `
    <ng-template
      transparent-header-container
      let-handleContentScroll>
      <ion-header>
        <ion-toolbar>
          <div class="max-width-container">
            <ion-title>Kitchen Sink</ion-title>
          </div>
        </ion-toolbar>
      </ion-header>
      <ng-container *ngIf="someDataLoading | async">
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
      </ng-container>
      <ion-content
        [ngClass]="{
          'page-content': true,
          'ion-padding': false
        }"
        [scrollEvents]="true"
        (ionScroll)="handleContentScroll($event)">
        <ion-card class="full-width flat hero">
          <div class="card-media">
            <img
              src="https://images.pexels.com/photos/1784578/pexels-photo-1784578.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            />
          </div>
          <ion-card-header class="max-width-container">
            <ion-card-subtitle color="light">Card Subtitle</ion-card-subtitle>
            <ion-card-title color="light">Card Title</ion-card-title>
          </ion-card-header>
          <ion-card-content class="max-width-container">
            Keep close to Nature's heart...and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
          </ion-card-content>
        </ion-card>
        <ion-grid class="max-width-container">
          <ion-row>
            <ion-col
              sizeXs="12"
              sizeSm="12"
              sizeMd="6"
              sizeLg="4"
              sizeXl="4">
              <ion-card ripple-container>
                <div class="card-media">
                  <video
                    src="https://player.vimeo.com/external/390846066.sd.mp4?s=75e4e5934d8187c25e9c8c61edbf89a6d3cbf470&profile_id=139&oauth2_token_id=57447761"
                    autoplay="true"
                  >
                  </video>
                </div>
                <ion-card-header>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                  <ion-card-title>Card Title</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Keep close to Nature's heart...and break clear away, once in awhile,
                  and climb a mountain or spend a week in the woods. Wash your spirit clean.
                </ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
              </ion-card>
            </ion-col>
            <ion-col
              sizeXs="12"
              sizeSm="12"
              sizeMd="6"
              sizeLg="4"
              sizeXl="4">
              <ion-card ripple-container>
                <ion-card-header>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                  <ion-card-title>Card Title</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Keep close to Nature's heart...and break clear away, once in awhile,
                  and climb a mountain or spend a week in the woods. Wash your spirit clean.
                </ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
              </ion-card>
            </ion-col>
            <ion-col
              sizeXs="12"
              sizeSm="12"
              sizeMd="6"
              sizeLg="4"
              sizeXl="4">
              <ion-card>
                <ion-item>
                  <ion-icon name="pin" slot="start"></ion-icon>
                  <ion-label>ion-item in a card, icon left, button right</ion-label>
                  <ion-button
                    slot="end"
                    shape="round"
                    size="medium"
                    fill="outline">
                    View
                  </ion-button>
                </ion-item>
                <ion-card-content>
                  This is content, without any paragraph or header tags,
                  within an ion-card-content element.
                  This is content, without any paragraph or header tags,
                  within an ion-card-content element.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col
              sizeXs="12"
              sizeSm="12"
              sizeMd="6"
              sizeLg="4"
              sizeXl="4">
              <ion-card ripple-container>
                <ion-card-header>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                  <ion-card-title>Card Title</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  Keep close to Nature's heart...and break clear away, once in awhile,
                  and climb a mountain or spend a week in the woods. Wash your spirit clean.
                </ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
        <!--<ion-button (click)="seedOrder()">Seed order</ion-button>-->
      </ion-content>
    </ng-template>
  `,
})
export class KitchenSinkContainer implements OnInit
{
  public someDataLoading = new BehaviorSubject(true)

  constructor(
    protected _renderer: Renderer2,
    @Inject(PERSISTENCE) private _persistenceApi: Persistence,
  )
  { }

  public ngOnInit(): void
  {
    timer(2000).subscribe(() => this.someDataLoading.next(false))
  }

  public async updateCart(): Promise<void>
  { }

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
