import { Component, Inject, OnInit } from "@angular/core"
import { InitializerFunction, INITIALIZE_CONTAINER } from "@funk/ui/web/app/initializer"
import { BehaviorSubject } from "rxjs"

@Component({
  selector: "shop",
  template: `
    <ng-container *ngIf="init | async">
      <h1>Shop</h1>
      <router-outlet></router-outlet>
    </ng-container>
  `,
})
export class ShopContainer implements OnInit
{
  public init = new BehaviorSubject(false)
  public constructor(
    @Inject(INITIALIZE_CONTAINER) private _init: InitializerFunction
  )
  { }

  public async ngOnInit(): Promise<void>
  {
    await this._init()
    this.init.next(true)
  }
}
