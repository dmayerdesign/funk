import { Marshall } from "@funk/identity/person/application/external/behaviors/persistence/marshall"
import { Person, PERSONS } from "@funk/identity/person/model/person"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(updateById: GenericUpdateById, marshall: Marshall) {
  return async function (
    documentPath: string,
    documentData: Partial<Person>,
  ): Promise<void> {
    await updateById(PERSONS, documentPath, marshall(documentData))
  }
}

export type UpdateById = ReturnType<typeof construct>
