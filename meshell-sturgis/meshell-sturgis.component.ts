import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"
import { filter } from "rxjs/operators"
import { Flash, UiService } from "./services/ui.service"

@Component({
  selector: "app-root",
  templateUrl: "./meshell-sturgis.component.html",
  styleUrls: ["./meshell-sturgis.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MeshellSturgisComponent implements OnInit {
  public nullFlash: Flash = {
    message: null,
    type: null,
  }
  public flash = { ...this.nullFlash }

  public constructor(
    public ui: UiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  public ngOnInit() {
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

  public resetFlash() {
    this.flash = { ...this.nullFlash }
  }
}
