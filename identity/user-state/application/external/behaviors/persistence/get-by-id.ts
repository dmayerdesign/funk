import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { Populate } from "@funk/identity/user-state/application/external/behaviors/persistence/populate"
import { GetById as GenericGetById } from "@funk/persistence/application/external/behaviors/get-by-id"

export function construct(getById: GenericGetById, populate: Populate) {
  return async function (documentPath: string): Promise<UserState | undefined> {
    const marshalledUserState = await getById<UserState>(
      USER_STATES,
      documentPath,
    )
    return await populate(marshalledUserState)
  }
}

export type GetById = ReturnType<typeof construct>
