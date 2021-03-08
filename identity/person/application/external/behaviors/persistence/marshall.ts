import { Person } from "@funk/identity/person/model/person"
import {
  Marshall as GenericMarshall,
  Marshalled,
} from "@funk/persistence/application/external/behaviors/marshall"

export function construct(_marshall: GenericMarshall) {
  return function (person: Partial<Person>): Marshalled<Person> {
    return person as Person
  }
}

export type Marshall = ReturnType<typeof construct>
