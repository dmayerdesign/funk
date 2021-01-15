import { asPromise } from "@funk/helpers/as-promise"
import roleHasAdminPrivilegeOrGreater from "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { GetMaybeContentPreviews } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-content-previews"
import { PublishAll } from "@funk/ui/core/admin/managed-content/editor/behaviors/publish-all"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { AlertController } from "@ionic/angular"

export function construct(
  userSession: UserSession,
  alert: AlertController,
  getMaybeContentPreviews: GetMaybeContentPreviews,
  publishAll: PublishAll,
) {
  return async function (): Promise<void> {
    const { person, auth } = await asPromise(userSession)

    // Do nothing if the user is not an admin.
    if (!roleHasAdminPrivilegeOrGreater(auth.claims.role)) return

    // Do nothing if no content previews exist.
    const maybeContentPreviews = await getMaybeContentPreviews(person)
    if (!maybeContentPreviews) {
      console.log("Couldn't find a preview to publish.")
      return
    }

    // Do nothing if the user does not confirm.
    const CONFIRM_MESSAGE =
      "You're about to publish (make visible to the public) all your " +
      "changes since the last time you published. This can't be undone."
    const confirmRemoveAll = await alert.create({
      header: "Are you sure?",
      message: CONFIRM_MESSAGE,
      buttons: [
        {
          text: "Keep editing",
          role: "cancel",
          cssClass: "secondary",
          handler: async () => {
            await alert.dismiss()
          },
        },
        {
          text: "Publish",
          cssClass: "",
          handler: async () => {
            await publishAll(maybeContentPreviews, person)
          },
        },
      ],
    })

    confirmRemoveAll.present()
  }
}

export type PublishAllOnConfirmation = ReturnType<typeof construct>
