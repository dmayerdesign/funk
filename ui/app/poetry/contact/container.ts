import { Component, Inject, OnInit } from "@angular/core"
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms"
import { ContactForm } from "@funk/model/contact/contact-form"
import { CONTACT_OWNER } from "@funk/ui/app/poetry/tokens"
import { GetToken, GET_TOKEN } from "@funk/ui/app/turing-test/get-token"
import { ContactOwner } from "@funk/ui/functions/contact/owner"

@Component({
  template: `
    <ion-content class="poetry-route" style="--background: transparent">
      <div class="poetry-route-inner">
        <h2>
          Contact Me
        </h2>
        <form
          [formGroup]="contactFormGroup"
          (ngSubmit)="handleSubmit()">

          <div class="control-group">
            <input id="name"
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
              formControlName="message">
            </textarea>
          </div>
          <div class="control-group">
            <button
              [disabled]="
                contactFormGroup.invalid ||
                submitting ||
                messageSent
              "
              [ngClass]="['submit-button']">

              <ng-container *ngIf="submitting">
                <div class="spinner">
                  <ion-spinner name="crescent"></ion-spinner>
                </div>
              </ng-container>

              <ng-container *ngIf="messageSent">
                Thanks!
              </ng-container>

              <ng-container *ngIf="messageSendDidError">
                Something went wrong :(
              </ng-container>

              <ng-container *ngIf="
                !submitting &&
                !messageSendDidError &&
                !messageSent
              ">
                Submit
              </ng-container>

            </button>
          </div>

        </form>
      </div>
    </ion-content>
  `,
})
export class ContactContainer implements OnInit
{
  public submitting = false
  public messageSent = false
  public messageSendDidError = false
  public contactFormGroup = new FormGroup({
    name: new FormControl("", [ Validators.required ]),
    emailAddress: new FormControl("", [ Validators.required ]),
    message: new FormControl("", [ Validators.required ]),
    turingTestToken: new FormControl(""),
  } as { [key in keyof ContactForm]: AbstractControl })

  public constructor(
    @Inject(CONTACT_OWNER) private _sendEmailToOwner: ContactOwner,
    @Inject(GET_TOKEN) private _getTuringTestToken: GetToken
  )
  { }

  public ngOnInit(): void
  { }

  public async handleSubmit(): Promise<void>
  {
    try
    {
      const turingTestTokenControl = this.contactFormGroup.get(
        "turingTestToken" as keyof ContactForm
      )
      turingTestTokenControl!.setValue(await this._getTuringTestToken())
      this.submitting = true
      await this._sendEmailToOwner(this.contactFormGroup.value)
      this.messageSent = true
    }
    catch (error)
    {
      console.error(error)
      this.messageSendDidError = true
    }
    finally
    {
      this.submitting = false
    }
  }
}
