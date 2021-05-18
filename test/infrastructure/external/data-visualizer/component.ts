import { Component } from "@angular/core"
import { getStore$ } from "@funk/test/plugins/external/persistence/in-memory-store"

@Component({
  selector: "test-data-visualizer",
  template: `<div id="test-data" *ngIf="store$ | async">
    <pre>{{ store$ | async | json }}</pre>
  </div>`,
  styles: [
    `
      #test-data {
        height: 100vh;
        overflow-y: scroll;
      }
    `,
  ],
})
export class TestDataVisualizerComponent {
  public store$ = getStore$()
}
