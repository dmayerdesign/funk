import marshallImpl from "@funk/identity/person/application/internal/behaviors/persistence/marshall"
import { Person, PERSONS } from "@funk/identity/person/model/person"
import genericSetById from "@funk/persistence/application/internal/behaviors/set-by-id"

export function construct(
  setById: typeof genericSetById,
  marshall: typeof marshallImpl,
) {
  return async function (
    documentPath: string,
    documentData: Person,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await setById(PERSONS, documentPath, marshall(documentData), options)
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(genericSetById, marshallImpl)
