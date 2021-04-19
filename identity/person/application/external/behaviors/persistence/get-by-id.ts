import { Populate } from "@funk/identity/person/application/external/behaviors/persistence/populate"
import { Person, PERSONS } from "@funk/identity/person/model/person"
import { GetById as GenericGetById } from "@funk/persistence/application/external/behaviors/get-by-id"

export function construct(getById: GenericGetById, populate: Populate) {
  return async function (documentPath: string): Promise<Person | undefined> {
    const marshalledPerson = await getById<Person>(PERSONS, documentPath)
    return await populate(marshalledPerson)
  }
}

export type GetById = ReturnType<typeof construct>
