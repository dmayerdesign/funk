import { SetById } from "@funk/content/application/external/behaviors/persistence/set-by-id"
import { GetMaybeContentPreviews } from "@funk/content/application/external/editor/behaviors/get-maybe-content-previews"
import { SaveIfEditing } from "@funk/content/application/external/editor/behaviors/save-if-editing"
import { DeleteById } from "@funk/content/preview/application/external/behaviors/persistence/delete-by-id"
import { Person } from "@funk/identity/person/model/person"

export function construct(
  setById: SetById,
  deleteById: DeleteById,
  getMaybeContentPreviews: GetMaybeContentPreviews,
  saveIfEditing: SaveIfEditing,
) {
  return async function (person: Person, contentId: string): Promise<void> {
    await saveIfEditing()

    const contentPreviews = await getMaybeContentPreviews(person)
    const contentPreviewToPublish = contentPreviews![contentId].content

    await setById(contentId, contentPreviewToPublish)
    await deleteById(contentId)
  }
}

export type PublishAndDeleteContentPreview = ReturnType<typeof construct>
