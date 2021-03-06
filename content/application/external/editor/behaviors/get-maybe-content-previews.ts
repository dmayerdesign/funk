import { ContentPreview } from "@funk/content/model/content-preview"
import { Person } from "@funk/identity/person/model/person"
import { GetById } from "@funk/identity/user-content/application/external/behaviors/persistence/get-by-id"

export function construct(getById: GetById) {
  return async function (
    person: Person,
  ): Promise<{ [contentId: string]: ContentPreview } | undefined> {
    const userContent = await getById(person.id)
    return userContent?.contentPreviews
  }
}

export type GetMaybeContentPreviews = ReturnType<typeof construct>
