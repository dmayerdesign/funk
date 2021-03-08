import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { Person } from "@funk/identity/person/model/person"
import { GetById } from "@funk/identity/user-state/application/external/behaviors/persistence/get-by-id"

export function construct(getById: GetById) {
  return async function (
    person: Person,
  ): Promise<{ [contentId: string]: ContentPreview } | undefined> {
    const userState = await getById(person.id)
    return userState?.contentPreviews
  }
}

export type GetMaybeContentPreviews = ReturnType<typeof construct>
