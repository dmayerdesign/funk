import { Organization } from "@funk/organization/model/organization"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
  return function (
    organization: Partial<Organization>,
  ): Marshalled<Organization> {
    return marshall(organization, [])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
