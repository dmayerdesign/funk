import { CancelEdit } from "@funk/admin/content/application/external/editor/behaviors/cancel-edit"
import { GetIsSaving } from "@funk/admin/content/application/external/editor/behaviors/get-is-saving"
import { GetMaybeActiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content"
import { GetMaybeActiveContentId } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { GetMaybeActiveContentValue } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value"
import { GetMaybeActiveContentValueControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { Content, ContentType } from "@funk/admin/content/model/content"
import { asPromise } from "@funk/helpers/as-promise"
import createDocPath from "@funk/helpers/create-doc-path"
import { UserSession } from "@funk/identity/application/external/user-session"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { UpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"
import { HtmlGetInnerText } from "@funk/ui/infrastructure/external/helpers/html/get-inner-text"

export function construct(
  getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl,
  getIsSaving: GetIsSaving,
  userSession: UserSession,
  getMaybeActiveContent: GetMaybeActiveContent,
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getMaybeActiveContentValue: GetMaybeActiveContentValue,
  htmlGetInnerText: HtmlGetInnerText,
  updateById: UpdateById,
  cancelEdit: CancelEdit,
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
            "createdAt",
          )]: Date.now(),
          [createDocPath<UserState>("contentPreviews", contentId, "content")]: {
            id: contentId,
            type: content!.type,
            value:
              content!.type === ContentType.HTML
                ? htmlValue
                : htmlGetInnerText(htmlValue),
          } as Content,
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
