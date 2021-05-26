import { ErrorHandler, Injectable } from "@angular/core"
import getMaybePresentableErrorMessage from "@funk/helpers/get-maybe-presentable-error-message"
import { ToastController } from "@ionic/angular"

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  public constructor(private _toastController: ToastController) {}

  public handleError(error: Error): void {
    const maybePresentableMessage = getMaybePresentableErrorMessage(error)
    if (maybePresentableMessage !== undefined) {
      this._toastController.create({
        message: maybePresentableMessage,
        duration: 5000,
        // closeButtonText: 'Got it',
        color: "danger",
      })
    }
  }
}
