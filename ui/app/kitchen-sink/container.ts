/* eslint-disable max-len */
import { Component, OnInit, Renderer2 } from "@angular/core"
import { BehaviorSubject, timer } from "rxjs"

@Component({
  selector: "kitchen-sink",
  template: `
    <ng-template sticky-header-container let-handleContentScroll>
      <ion-header class="header sticky-header transparent-until-scrolled">
        <ion-toolbar class="toolbar max-width-container">
          <ion-buttons class="buttons" slot="start">
            <ion-menu-button class="menu-button"></ion-menu-button>
          </ion-buttons>
          <ion-title class="title">Kitchen Sink</ion-title>
        </ion-toolbar>
      </ion-header>
      <ng-container *ngIf="someDataLoading | async">
        <ion-progress-bar
          class="progress-bar"
          type="indeterminate"
        ></ion-progress-bar>
      </ng-container>
      <ion-content
        class="content sticky-header-content ion-padding"
        [scrollEvents]="true"
        (ionScroll)="handleContentScroll($event)"
        style="
          --padding-start: 0;
          --padding-end: 0;
          --padding-top: 0;
        "
      >
        <ion-card class="card full-width flat hero">
          <managed-content
            [contentId]="'kitchen-sink-hero-1'"
          ></managed-content>
          <div
            class="card-media card-media-background-image"
            [style.background-image]="
              'url(https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)'
            "
          ></div>
          <ion-card-header class="card-header max-width-container">
            <ion-card-subtitle class="card-subtitle" color="light"
              >Card Subtitle</ion-card-subtitle
            >
            <ion-card-title class="card-title" color="light"
              >Card Title</ion-card-title
            >
          </ion-card-header>
          <ion-card-content class="card-content max-width-container">
            <ion-text class="paragraph" color="light">
              Keep close to Nature's heart...and break clear away, once in
              awhile, and climb a mountain or spend a week in the woods. Wash
              your spirit clean.
            </ion-text>
          </ion-card-content>
        </ion-card>
        <ion-grid class="max-width-container">
          <ion-row>
            <ion-col sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
              <ion-card class="card" ripple-container>
                <div class="card-media">
                  <video
                    src="https://player.vimeo.com/external/390846066.sd.mp4?s=75e4e5934d8187c25e9c8c61edbf89a6d3cbf470&profile_id=139&oauth2_token_id=57447761"
                    autoplay="true"
                  ></video>
                </div>
                <ion-card-header class="card-header">
                  <ion-card-subtitle class="card-subtitle"
                    >Card Subtitle</ion-card-subtitle
                  >
                  <ion-card-title class="card-title">Card Title</ion-card-title>
                </ion-card-header>
                <ion-card-content class="card-content">
                  Keep close to Nature's heart...and break clear away, once in
                  awhile, and climb a mountain or spend a week in the woods.
                  Wash your spirit clean.
                </ion-card-content>
                <ion-ripple-effect class="ripple-effect"></ion-ripple-effect>
              </ion-card>
            </ion-col>
            <ion-col sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
              <ion-card class="card">
                <ion-card-header class="card-header">
                  <ion-card-subtitle class="card-subtitle"
                    >Card Subtitle</ion-card-subtitle
                  >
                  <ion-card-title class="card-title">Card Title</ion-card-title>
                </ion-card-header>
                <ion-card-content class="card-content">
                  Keep close to Nature's heart...and break clear away, once in
                  awhile, and climb a mountain or spend a week in the woods.
                  Wash your spirit clean.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col
              class="col"
              sizeXs="12"
              sizeSm="12"
              sizeMd="6"
              sizeLg="4"
              sizeXl="4"
            >
              <ion-card class="card">
                <ion-item class="item">
                  <ion-icon
                    class="icon"
                    lazy="true"
                    name="pin"
                    slot="start"
                  ></ion-icon>
                  <ion-label class="label">
                    ion-item in a card, icon left, button right
                  </ion-label>
                  <ion-button class="button" color="primary">View</ion-button>
                </ion-item>
                <ion-card-content class="card-content">
                  This is content, without any paragraph or header tags, within
                  an ion-card-content element. This is content, without any
                  paragraph or header tags, within an ion-card-content element.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col
              class="col"
              sizeXs="12"
              sizeSm="12"
              sizeMd="6"
              sizeLg="4"
              sizeXl="4"
            >
              <ion-card class="card">
                <ion-card-header class="card-header">
                  <ion-card-subtitle class="card-subtitle"
                    >Card Subtitle</ion-card-subtitle
                  >
                  <ion-card-title class="card-title">Card Title</ion-card-title>
                </ion-card-header>
                <ion-card-content class="card-content">
                  <managed-content contentId="sink-content-1"></managed-content>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ng-template>
  `,
})
export class KitchenSinkContainer implements OnInit {
  public someDataLoading = new BehaviorSubject(true)

  public constructor(protected _renderer: Renderer2) {}

  public ngOnInit(): void {
    timer(2000).subscribe(() => this.someDataLoading.next(false))
  }

  public async updateCart(): Promise<void> {}
}
