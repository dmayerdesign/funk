import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ModuleContainer } from '@funk/ui/helpers/angular.helpers'

@Component({
  template: `
    <div [ngStyle]="{ marginTop: '50px' }">
      <h1>Set secret</h1>
    </div>
    <div [ngStyle]="{ marginTop: '50px' }">
      <h1>Get secret</h1>
    </div>
  `,
})
export class AdminContainer extends ModuleContainer
{
  public setSecretFormGroup = new FormGroup({
    key: new FormControl(),
    value: new FormControl(),
  })
}
