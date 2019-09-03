import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'not-found',
  template: `
    <h1>Not Found</h1>
    <button mat-raised-button color="accent">Go back</button>
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {
  }

}
