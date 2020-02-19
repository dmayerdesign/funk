import { Location } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'not-found',
  template: `
    <h1>Not Found</h1>
    <ion-button mat-raised-button
      color="accent"
      (click)="location.back()">
      Go back
    </ion-button>
  `,
})
export class NotFoundComponent
{
  constructor(
    public location: Location,
  )
  { }
}
