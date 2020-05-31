import { Component, OnInit } from "@angular/core"
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

  public async ngOnInit(): Promise<void>
  {
    this.init.next(true)
  }
}
