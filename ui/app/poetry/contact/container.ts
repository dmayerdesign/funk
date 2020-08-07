import { Component, Inject } from "@angular/core"
import { AbstractControl, FormControl, FormGroup } from "@angular/forms"
import { ContactForm } from "@funk/model/contact/contact-form"
import { CONTACT_OWNER } from "@funk/ui/app/poetry/tokens"
import { ContactOwner } from "@funk/ui/functions/contact/owner"

@Component({
  template: `
    <form
      [formGroup]="contactFormGroup"
      (ngSubmit)="sendEmailToOwner(contactFormGroup.value)">

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
      </div>

    </form>
  `,
})
export class ContactContainer
{
  public contactFormGroup = new FormGroup({
    name: new FormControl(""),
    emailAddress: new FormControl(""),
    message: new FormControl(""),
  } as { [key in keyof ContactForm]: AbstractControl })

  public constructor(
    @Inject(CONTACT_OWNER) public sendEmailToOwner: ContactOwner
  ) { }
}
