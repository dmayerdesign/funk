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
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
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
