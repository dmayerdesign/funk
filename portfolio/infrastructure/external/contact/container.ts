import { Component, Inject, OnInit } from "@angular/core"
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms"
import {
  GetToken,
  GET_TOKEN,
} from "@funk/auth/plugins/external/turing-test/behaviors/get-token"
import { ContactOwner } from "@funk/contact/infrastructure/external/cloud-functions/owner"
import { ContactForm } from "@funk/contact/model/contact-form"
import { CONTACT_OWNER } from "@funk/portfolio/infrastructure/external/tokens"
import { PageTitle } from "@funk/ui/atlas/application/external/page-title"
import { PAGE_TITLE } from "@funk/ui/infrastructure/external/tokens"

@Component({
  template: `
    <ion-content
      class="content portfolio-route"
      style="--background: transparent"
    >
      <div class="portfolio-route-inner">
        <page-title-heading></page-title-heading>
        <form [formGroup]="contactFormGroup" (ngSubmit)="handleSubmit()">
          <div class="control-group">
            <input
              id="name"
              placeholder="Your Name"
              type="text"
              formControlName="name"
            />
          </div>
          <div class="control-group">
            <input
              id="email-address"
              placeholder="Your Email Address"
              type="email"
              formControlName="emailAddress"
            />
          </div>
          <div class="control-group">
            <textarea
              id="message"
              placeholder="Your Message"
              formControlName="message"
            >
            </textarea>
          </div>
          <div class="control-group">
            <button
              [disabled]="contactFormGroup.invalid || submitting || messageSent"
              [ngClass]="['submit-button']"
            >
              <ng-container *ngIf="submitting">
                <div class="spinner">
                  <ion-spinner class="spinner" name="crescent"></ion-spinner>
                </div>
              </ng-container>

              <ng-container *ngIf="messageSent"> Thanks! </ng-container>

              <ng-container *ngIf="messageSendDidError">
                Something went wrong :(
              </ng-container>

              <ng-container
                *ngIf="!submitting && !messageSendDidError && !messageSent"
              >
                Submit
              </ng-container>
            </button>
          </div>
        </form>
      </div>
    </ion-content>
  `,
})
export class ContactContainer implements OnInit {
  public submitting = false
  public messageSent = false
  public messageSendDidError = false
  public contactFormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    emailAddress: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required]),
    turingTestToken: new FormControl(""),
  } as { [key in keyof ContactForm]: AbstractControl })

  public constructor(
    @Inject(CONTACT_OWNER) private _sendEmailToOwner: ContactOwner,
    @Inject(GET_TOKEN) private _getTuringTestToken: GetToken,
    @Inject(PAGE_TITLE) public pageTitle: PageTitle,
  ) {}

  public ngOnInit(): void {}

  public async handleSubmit(): Promise<void> {
    try {
      const turingTestTokenControl = this.contactFormGroup.get(
        "turingTestToken" as keyof ContactForm,
      )
      turingTestTokenControl!.setValue(await this._getTuringTestToken())
      this.submitting = true
      await this._sendEmailToOwner(this.contactFormGroup.value)
      this.messageSent = true
    } catch (error) {
      console.error(error)
      this.messageSendDidError = true
    } finally {
      this.submitting = false
    }
  }
}
