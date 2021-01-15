import { RemoveAllPreviews } from "@funk/ui/core/admin/managed-content/editor/behaviors/remove-all-previews"
import { AlertController } from "@ionic/angular"

export function construct(
  alert: AlertController,
  removeAllPreviews: RemoveAllPreviews,
) {
  return async function (): Promise<void> {
    const CONFIRM_MESSAGE =
      "You're about to discard all your changes since the last time you " +
      "published. This can't be undone."
    const confirmRemoveAll = await alert.create({
      header: "Are you sure?",
      message: CONFIRM_MESSAGE,
      buttons: [
        {
          text: "Keep",
          role: "cancel",
          cssClass: "secondary",
          handler: async () => {
            await alert.dismiss()
          },
        },
        {
          text: "Discard",
          cssClass: "",
          handler: async () => {
            await removeAllPreviews()
          },
        },
      ],
    })

    confirmRemoveAll.present()
  }
}

export type RemoveAllPreviewsOnConfirmation = ReturnType<typeof construct>
