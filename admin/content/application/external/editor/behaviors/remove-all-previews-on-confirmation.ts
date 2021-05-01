import { RemoveAllPreviews } from "@funk/admin/content/application/external/editor/behaviors/remove-all-previews"
import { AlertController } from "@ionic/angular"

export function construct(
  alert: AlertController,
  removeAllPreviews: RemoveAllPreviews,
) {
  return async function (): Promise<boolean> {
    const CONFIRM_MESSAGE =
      "You're about to discard all your changes since the last time you " +
      "published. This can't be undone."
    return new Promise((resolve) => {
      alert
        .create({
          header: "Are you sure?",
          message: CONFIRM_MESSAGE,
          buttons: [
            {
              text: "Keep",
              role: "cancel",
              cssClass: "secondary",
              handler: async () => {
                await alert.dismiss()
                resolve(false)
              },
            },
            {
              text: "Discard",
              cssClass: "",
              handler: async () => {
                await removeAllPreviews()
                resolve(true)
              },
            },
          ],
        })
        .then((confirmRemoveAll) => {
          confirmRemoveAll.present()
        })
    })
  }
}

export type RemoveAllPreviewsOnConfirmation = ReturnType<typeof construct>
