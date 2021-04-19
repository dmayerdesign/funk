import { Person } from "@funk/identity/person/model/person"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
  return function (person: Person): Marshalled<Person> {
    return marshall(person, [])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
