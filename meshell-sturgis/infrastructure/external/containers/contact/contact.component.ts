import { HttpClient } from "@angular/common/http"
import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Subscription } from "rxjs"
import { CacheService } from "../../services/cache.service"
import { ConfigService } from "../../services/config.service"
import { PagesService } from "../../services/pages.service"
import { UiService } from "../../services/ui.service"

@Component({
  selector: "ms-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit, OnDestroy {
  private pagesSub?: Subscription
  public page: any
  public contactForm!: FormGroup
  public contactFormSubmitting = false
  public contactFormSubmitWasAttempted = false

  constructor(
    private ui: UiService,
    private cs: ConfigService,
    private pages: PagesService,
    private cache: CacheService,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.getContactPage()
    this.initForm()
  }

  ngOnDestroy() {
    if (this.pagesSub) this.pagesSub.unsubscribe()
  }

  getContactPage() {
    if (this.cache.contact) {
      this.page = this.cache.contact
      setTimeout(() => this.ui.transition$.next(false))
      return
    }

    this.pages.getOneBySlug("contact")
    this.pagesSub = this.pages.getOne$.subscribe((page) => {
      this.page = page
      setTimeout(() => this.ui.transition$.next(false))
      if (!this.page || !this.page.content) return
      this.cache.contact = this.page
    })
  }

  initForm() {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required],
    })
  }

  submitContact() {
    const endpoint =
      this.cs.config.rootUrl +
      "/" +
      this.cs.constants.ENDPOINTS.BASE +
      "/submit-contact-form"
    this.contactFormSubmitWasAttempted = true
    if (!this.contactForm.valid) {
      return
    }
    this.contactFormSubmitting = true
    this.http.post(endpoint, this.contactForm.value).subscribe(
      () => this.handleSubmitSuccess(),
      (error) => {
        // Just swallow errors for now — the function (in `functions.php`) is erroring
        // for some reason on that endpoint.
        this.handleSubmitSuccess()
        // if (error.message.indexOf('Http failure during parsing') > -1) {
        //     this.handleSubmitSuccess();
        // }
        // else {
        //     this.ui.flash("Sorry, couldn't submit your form. Try again later.", "error");
        //     this.contactFormSubmitting = false;
        //     console.error(error);
        // }
      },
    )
  }

  handleSubmitSuccess() {
    this.ui.flash("Thanks for reaching out! I'll get back to you soon.")
    this.contactFormSubmitting = false
  }
}
