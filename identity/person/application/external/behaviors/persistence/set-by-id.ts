import { Marshall } from "@funk/identity/person/application/external/behaviors/persistence/marshall"
import { Person, PERSONS } from "@funk/identity/person/model/person"
import { SetById as GenericSetById } from "@funk/persistence/application/external/behaviors/set-by-id"

export function construct(setById: GenericSetById, marshall: Marshall) {
  return async function (
    documentPath: string,
    documentData: Person,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(PERSONS, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>
