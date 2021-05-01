import { GetMaybeActiveContentId } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { PublishOneOrReportConflict } from "@funk/admin/content/application/external/editor/behaviors/publish-one-or-report-conflict"
import roleHasAdminPrivilegeOrGreater from "@funk/auth/model/helpers/role-has-admin-privilege-or-greater"
import { ForbiddenError } from "@funk/error/model/forbidden-error"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/identity/application/external/user-session"
import { AlertController } from "@ionic/angular"

export function construct(
  userSession: UserSession,
  alert: AlertController,
  publishOneOrReportConflict: PublishOneOrReportConflict,
  getMaybeActiveContentId: GetMaybeActiveContentId,
) {
  return async function (): Promise<boolean> {
    const { person, auth } = await asPromise(userSession)
    const maybeActiveContentId = await asPromise(getMaybeActiveContentId())

    // Throw if the user is not an admin.
    if (!roleHasAdminPrivilegeOrGreater(auth.claims.role)) {
      throw new ForbiddenError("You don't have permission to publish content.")
    }

    return await new Promise((resolve) => {
      // Do nothing if the user does not confirm.
      const CONFIRM_MESSAGE =
        "You're about to publish (make visible to the public) this blog post. " +
        "This can't be undone."
      alert
        .create({
          header: "Are you sure?",
          message: CONFIRM_MESSAGE,
          buttons: [
            {
              text: "Keep working",
              handler: async () => {
                await alert.dismiss()
                resolve(false)
              },
            },
            {
              text: "Publish",
              handler: async () => {
                await publishOneOrReportConflict(maybeActiveContentId!, person)
                resolve(true)
              },
            },
          ],
        })
        .then((confirmPublishOne) => {
          confirmPublishOne.present()
        })
    })
  }
}

/**
 * @returns a Promise that resolves to `true` if the user confirmed and the post was published,
 * or `false` if the user decided not to publish.
 */
export type PublishOneOnConfirmation = ReturnType<typeof construct>
