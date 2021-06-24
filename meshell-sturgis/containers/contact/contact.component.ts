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
import { GetById as GetContentById } from "@funk/content/application/external/behaviors/persistence/get-by-id"
import { GET_CONTENT_BY_ID } from "@funk/content/infrastructure/external/persistence/tokens"
import { UiService } from "@funk/meshell-sturgis/services/ui.service"
import { CONTACT_OWNER } from "@funk/portfolio/infrastructure/external/tokens"

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
    @Inject(GET_CONTENT_BY_ID) private _getContentById: GetContentById,
    private _ui: UiService,
  ) {}

  public async ngOnInit(): Promise<void> {
    const canary = this._getContentById("contact-title")
    await canary
    this._ui.transition$.next(false)
  }

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
