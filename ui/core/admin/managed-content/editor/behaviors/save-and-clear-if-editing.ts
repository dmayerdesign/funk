import { asPromise } from "@funk/helpers/as-promise"
import createDocPath from "@funk/helpers/create-doc-path"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"
import {
  ManagedContent,
  ManagedContentType
} from "@funk/model/managed-content/managed-content"
import { CancelEdit } from "@funk/ui/core/admin/managed-content/editor/behaviors/cancel-edit"
import { GetIsSaving } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-is-saving"
import { GetMaybeActiveContent } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content"
import { GetMaybeActiveContentId } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-id"
import { GetMaybeActiveContentValue } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-value"
import { GetMaybeActiveContentValueControl } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-value-control"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { HtmlGetInnerText } from "@funk/ui/helpers/html/get-inner-text"
import { UpdateById } from "@funk/ui/plugins/persistence/behaviors/update-by-id"

export function construct(
  getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl,
  getIsSaving: GetIsSaving,
  userSession: UserSession,
  getMaybeActiveContent: GetMaybeActiveContent,
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getMaybeActiveContentValue: GetMaybeActiveContentValue,
  htmlGetInnerText: HtmlGetInnerText,
  updateById: UpdateById,
  cancelEdit: CancelEdit
) {
  return async function (): Promise<void> {
    const control = await asPromise(getMaybeActiveContentValueControl())

    if (control) {
      getIsSaving().next(true)

      const { person } = await asPromise(userSession)
      const content = await asPromise(getMaybeActiveContent())
      const contentId = (await asPromise(getMaybeActiveContentId())) as string
      const htmlValue = await asPromise(getMaybeActiveContentValue())

      try {
        const userStateUpdate = {
          [createDocPath<UserState>(
            "contentPreviews",
            contentId,
            "createdAt"
          )]: Date.now(),
          [createDocPath<UserState>("contentPreviews", contentId, "content")]: {
            id: contentId,
            type: content!.type,
            value:
              content!.type === ManagedContentType.HTML
                ? htmlValue
                : htmlGetInnerText(htmlValue),
          } as ManagedContent,
        } as Partial<UserState>

        await updateById<UserState>(USER_STATES, person.id, userStateUpdate)
      } catch (error) {
        console.log("There was an error updating the preview.", error)
      }
      getIsSaving().next(false)
      cancelEdit()
    }
  }
}

export type SaveAndClearIfEditing = ReturnType<typeof construct>
