import { SetById } from "@funk/admin/content/application/external/behaviors/persistence/set-by-id"
import { GetMaybeContentPreviews } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-content-previews"
import { DeleteById } from "@funk/admin/content/preview/application/external/behaviors/persistence/delete-by-id"
import { Person } from "@funk/identity/person/model/person"

export function construct(
  setById: SetById,
  deleteById: DeleteById,
  getMaybeContentPreviews: GetMaybeContentPreviews,
) {
  return async function (person: Person, contentId: string): Promise<void> {
    const contentPreviews = await getMaybeContentPreviews(person)
    await setById(contentId, contentPreviews![contentId].content)
    await deleteById(contentId)
  }
}

export type PublishAndDeleteContentPreview = ReturnType<typeof construct>
