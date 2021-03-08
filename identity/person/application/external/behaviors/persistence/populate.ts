import { Person } from "@funk/identity/person/model/person"
import { Marshalled } from "@funk/persistence/application/external/behaviors/marshall"
import { Populate as GenericPopulate } from "@funk/persistence/application/external/behaviors/populate"

export function construct(_populate: GenericPopulate<Person>) {
  return async function (
    person: Marshalled<Person> | undefined,
  ): Promise<Person> {
    return person as Person
  }
}

export type Populate = ReturnType<typeof construct>
