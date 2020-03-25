import { Component, Inject, OnInit, Renderer2 } from '@angular/core'
import { Manager } from '@dannymayer/vex'
import { Address } from '@funk/model/address/address'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { PersistenceApi } from '@funk/ui/core/persistence/api'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { mapToKey } from '@funk/ui/helpers/rxjs-shims'
import { timer } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { KitchenSinkState } from './state'

@Component({
  selector: 'kitchen-sink',
  template: `
    <ng-template transparent-header-container
      let-handleContentScroll>

      <ion-header>
        <ion-toolbar>
          <ion-title>Kitchen Sink</ion-title>
        </ion-toolbar>
      </ion-header>

      <ng-container *ngIf="someDataLoading | async">
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
      </ng-container>

      <!--<ion-content class="ion-padding">-->
      <ion-content
        [scrollEvents]="true"
        (ionScroll)="handleContentScroll($event)">
        <ion-grid class="full-width">
          <ion-row>
            <ion-col class="full-width" size="12">
              <ion-card class="flat full-width" ripple-container>
                <div class="card-media-max-height">
                  <img
                    src="https://images.pexels.com/photos/1784578/pexels-photo-1784578.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  />
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
            <ion-col size="4">
              <ion-card>
                <div class="card-media-max-height">
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
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!-- Filler to test scrolling. -->
        <ion-card>
          <ion-item>
            <ion-icon name="pin" slot="start"></ion-icon>
            <ion-label>ion-item in a card, icon left, button right</ion-label>
            <ion-button fill="outline" slot="end">View</ion-button>
          </ion-item>
          <ion-item>
            <ion-icon name="pin" slot="start"></ion-icon>
            <ion-label>ion-item in a card, icon left, button right</ion-label>
            <ion-button fill="outline" slot="end">View</ion-button>
          </ion-item>

          <ion-card-content>
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
          </ion-card-content>
          <ion-card-content>
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
          </ion-card-content>
          <ion-card-content>
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
          </ion-card-content>
          <ion-card-content>
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
          </ion-card-content>
          <ion-card-content>
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
          </ion-card-content>
          <ion-card-content>
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
          </ion-card-content>
        </ion-card>

        <!--<ion-button (click)="seedOrder()">Seed order</ion-button>-->

      </ion-content>
    </ng-template>
  `,
})
export class KitchenSinkContainer implements OnInit
{
  public someDataLoading = this._manager.state$.pipe(mapToKey('someDataLoading'))

  constructor(
    protected _renderer: Renderer2,
    @Inject(PersistenceApi) private _persistenceApi: Persistence,
    private _manager: Manager<KitchenSinkState>
  )
  { }

  public ngOnInit(): void
  {
    this._manager.dispatch({
      type: 'KITCHEN_SINK_INIT',
      reduce: () => ({
        someData: undefined,
        someDataLoading: true,
      }),
    })

    this._manager.dispatch({
      type: 'KITCHEN_SINK_LOAD',
      resolve: (state$) => timer(2000).pipe(
        switchMap(() => state$),
        map((state) => ({
          ...state,
          someData: [],
          someDataLoading: false,
        }))
      ),
    })
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
