import { UserContent, USER_CONTENTS } from "@funk/identity/model/user-content"
import { Populate } from "@funk/identity/user-content/application/external/behaviors/persistence/populate"
import { GetById as GenericGetById } from "@funk/persistence/application/external/behaviors/get-by-id"

export function construct(getById: GenericGetById, populate: Populate) {
  return async function (
    documentPath: string,
  ): Promise<UserContent | undefined> {
    const marshalledUserContent = await getById<UserContent>(
      USER_CONTENTS,
      documentPath,
    )
    return await populate(marshalledUserContent)
  }
}

export type GetById = ReturnType<typeof construct>
