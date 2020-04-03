import { ErrorHandler, Injectable } from '@angular/core'
import { ToastController } from '@ionic/angular'

@Injectable()
export class AppErrorHandler implements ErrorHandler
{
  constructor(
    private _toastController: ToastController,
  ) { }
  public handleError(error: Error): void
  {
    if (error.message && error.message.indexOf('[funk] ') === 0)
    {
      const presentableMessage = error.message.replace('[funk] ', '')
      this._toastController.create({
        message: presentableMessage,
        duration: 5000,
        // closeButtonText: 'Got it',
        color: 'danger',
      })
    }
  }
}
