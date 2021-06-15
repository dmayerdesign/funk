import roleHasAdminPrivilegeOrGreater from "@funk/auth/model/helpers/role-has-admin-privilege-or-greater"
import { GetMaybeActiveContentId } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { PublishOneOrReportConflict } from "@funk/content/application/external/editor/behaviors/publish-one-or-report-conflict"
import { ForbiddenError } from "@funk/error/model/forbidden-error"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/identity/application/external/user-session"
import { AlertController } from "@ionic/angular"
import { timer } from "rxjs"

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
        "You're about to publish this blog post, meaning it will be visible to the public."
      alert
        .create({
          header: "Are you sure?",
          message: CONFIRM_MESSAGE,
          buttons: [
            {
              text: "Keep working",
              role: "cancel",
              handler: async () => {
                await alert.dismiss()
                // Wait for the dialog to close.
                await asPromise(timer(200))
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
