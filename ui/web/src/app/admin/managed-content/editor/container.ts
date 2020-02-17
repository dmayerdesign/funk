import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { of } from 'rxjs'
import { shareReplay, switchMap } from 'rxjs/operators'

@Component({
  selector: 'managed-content-editor',
  template: `
    <div class="managed-content-editor--container">
      <textarea [formControl]="updatedContentValueControl"></textarea>
      <button></button>
    </div>
  `,
})
export class ManagedContentEditorComponent implements OnInit
{
  public isEditing = of(false)
  public updatedContentValueControl = of(new FormControl(''))
  public updatedContentValueChanges = this.updatedContentValueControl.pipe(
    switchMap((control) => control.valueChanges),
    shareReplay(1),
  )

  public ngOnInit(): void
  {
    this.updatedContentValueChanges.subscribe()
  }
}
