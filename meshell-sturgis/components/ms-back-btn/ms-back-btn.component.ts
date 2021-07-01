import { Location } from "@angular/common"
import { Component, Input } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "ms-back-btn",
  template: `
    <button aria-label="go back" (click)="onClick()">
      <img [attr.src]="'/assets/meshell-sturgis/images/arrow-left-white.svg'" />
      <span class="back-btn-text" [innerHTML]="text"></span>
    </button>
  `,
  styleUrls: ["./ms-back-btn.component.scss"],
})
export class MsBackBtnComponent {
  @Input() public routeUrl?: string | undefined
  @Input() public text = "Back"

  public constructor(private router: Router, private location: Location) {}

  public onClick() {
    if (this.routeUrl) {
      this.router.navigateByUrl(this.routeUrl)
    } else {
      this.location.back()
    }
  }
}
