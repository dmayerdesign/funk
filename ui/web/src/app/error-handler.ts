import { ErrorHandler, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(
    private _matSnackBar: MatSnackBar,
  ) { }
  public handleError(error: Error): void {
    if (error.message && error.message.indexOf('[funk] ') === 0) {
      const presentableMessage = error.message.replace('[funk] ', '')
      this._matSnackBar.open(presentableMessage, 'Got it', {
        duration: 5000
      })
    }
  }
}
