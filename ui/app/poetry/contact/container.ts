import { Component, Inject, OnInit } from "@angular/core"
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms"
import { ContactForm } from "@funk/model/contact/contact-form"
import { CONTACT_OWNER } from "@funk/ui/app/poetry/tokens"
import { GetToken, GET_TOKEN } from "@funk/ui/app/turing-test/get-token"
import { ContactOwner } from "@funk/ui/functions/contact/owner"

@Component({
  template: `
    <form
      [formGroup]="contactFormGroup"
      (ngSubmit)="handleSubmit()">

      <div>
        <input id="name"
          placeholder="Your Name"
          type="text"
          formControlName="name"
        />
        <input
          id="email-address"
          placeholder="Your Email Address"
          type="text"
          formControlName="emailAddress"
        />
        <textarea
          id="message"
          placeholder="Your Message"
          formControlName="message">
        </textarea>
        <button [disabled]="contactFormGroup.invalid">Submit</button>
      </div>

    </form>
  `,
})
export class ContactContainer implements OnInit
{
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
      this.contactFormGroup.get("turingTestToken" as keyof ContactForm)!.setValue(
        await this._getTuringTestToken()
      )
      await this._sendEmailToOwner(this.contactFormGroup.value)
    }
    catch (error)
    {
      console.error(error)
    }
  }
}
