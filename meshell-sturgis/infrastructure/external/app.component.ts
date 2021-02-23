import { ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"
import { filter } from "rxjs/operators"
import { UiService } from "./services/ui.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  nullFlash = {
    message: null,
    type: null,
  }
  flash = { ...this.nullFlash }

  constructor(
    public ui: UiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.ui.transition$.subscribe((isTransitioning) => {
      this.cdr.detectChanges()
    })

    this.ui.flash$.subscribe((flash) => {
      this.flash = flash
    })

    this.ui.flashCancel$.subscribe(() => this.resetFlash())

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.ui.transition$.next(true)
      })
  }

  resetFlash() {
    this.flash = { ...this.nullFlash }
  }
}
