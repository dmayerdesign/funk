import { GetMaybeContentPreviews } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-content-previews"
import { PublishAllOrReportConflicts } from "@funk/admin/content/application/external/editor/behaviors/publish-all-or-report-conflicts"
import roleHasAdminPrivilegeOrGreater from "@funk/auth/model/helpers/role-has-admin-privilege-or-greater"
import { ForbiddenError } from "@funk/error/model/forbidden-error"
import { InvalidStateError } from "@funk/error/model/invalid-state-error"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/identity/application/external/user-session"
import { AlertController } from "@ionic/angular"

export function construct(
  userSession: UserSession,
  alert: AlertController,
  getMaybeContentPreviews: GetMaybeContentPreviews,
  publishAllOrReportConflicts: PublishAllOrReportConflicts,
) {
  return async function (): Promise<boolean> {
    const { person, auth } = await asPromise(userSession)

    // Do nothing if the user is not an admin.
    if (!roleHasAdminPrivilegeOrGreater(auth.claims.role)) {
      throw new ForbiddenError("You don't have permission to publish content.")
    }

    // Do nothing if no content previews exist.
    const maybeContentPreviews = await getMaybeContentPreviews(person)
    if (!maybeContentPreviews) {
      throw new InvalidStateError("Couldn't find a preview to publish.")
    }

    return new Promise((resolve) => {
      // Do nothing if the user does not confirm.
      const CONFIRM_MESSAGE =
        "You're about to publish (make visible to the public) all your " +
        "changes since the last time you published. This can't be undone."
      alert
        .create({
          header: "Are you sure?",
          message: CONFIRM_MESSAGE,
          buttons: [
            {
              text: "Keep editing",
              role: "cancel",
              cssClass: "secondary",
              handler: async () => {
                await alert.dismiss()
                resolve(false)
              },
            },
            {
              text: "Publish",
              cssClass: "",
              handler: async () => {
                await publishAllOrReportConflicts(maybeContentPreviews, person)
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

export type PublishAllOnConfirmation = ReturnType<typeof construct>
