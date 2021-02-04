import { ContentPreview } from "@funk/admin/model/managed-content/content-preview"
import { Person } from "@funk/identity/model/person"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { GetById } from "@funk/persistence/application/external/behaviors/get-by-id"

export function construct(getById: GetById) {
  return async function (
    person: Person,
  ): Promise<{ [contentId: string]: ContentPreview } | undefined> {
    const userState = await getById<UserState>(USER_STATES, person.id)
    return userState?.contentPreviews
  }
}

export type GetMaybeContentPreviews = ReturnType<typeof construct>
