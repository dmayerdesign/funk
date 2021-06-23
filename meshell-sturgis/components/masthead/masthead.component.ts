import { Component } from "@angular/core"

@Component({
  selector: "ms-masthead",
  templateUrl: "./masthead.component.html",
  styleUrls: ["./masthead.component.scss"],
})
export class MastheadComponent {
  public logoUrl = "/assets/meshell-sturgis/images/meshell-logo.png"

  public rootPath = "/"
}
