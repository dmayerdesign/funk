import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <managed-content-editor>
      <main class="admin-edit-mode-is-on">
        <ion-router-outlet></ion-router-outlet>
      </main>
    </managed-content-editor>
  `,
})
export class AppComponent
{
}
