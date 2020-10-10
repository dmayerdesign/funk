import { Person } from "@funk/model/identity/person"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"
import { ContentPreview } from "@funk/model/managed-content/content-preview"
import { GetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"

export function construct(getById: GetById) {
  return async function (
    person: Person
  ): Promise<{ [contentId: string]: ContentPreview } | undefined> {
    const userState = await getById<UserState>(USER_STATES, person.id)
    return userState?.contentPreviews
  }
}

export type GetMaybeContentPreviews = ReturnType<typeof construct>
