import { Injectable } from '@angular/core'
import { BehaviorSubject, ReplaySubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ManagedContentEditorService
{
  private _isEditing = new BehaviorSubject<boolean>(false)
  public isEditing = this._isEditing.asObservable()
}
