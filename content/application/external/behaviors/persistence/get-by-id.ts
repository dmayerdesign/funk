import { Populate } from "@funk/content/application/external/behaviors/persistence/populate"
import { Content, CONTENTS } from "@funk/content/model/content"
import { GetById as GenericGetById } from "@funk/persistence/application/external/behaviors/get-by-id"

export function construct(getById: GenericGetById, populate: Populate) {
  return async function (documentPath: string): Promise<Content | undefined> {
    try {
      const marshalledContent = await getById<Content>(CONTENTS, documentPath)
      return await populate(marshalledContent)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export type GetById = ReturnType<typeof construct>
