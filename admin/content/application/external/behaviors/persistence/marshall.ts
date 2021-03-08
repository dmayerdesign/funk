import { Content } from "@funk/admin/content/model/content"
import {
  Marshall as GenericMarshall,
  Marshalled,
} from "@funk/persistence/application/external/behaviors/marshall"

export function construct(_marshall: GenericMarshall) {
  return function (content: Partial<Content>): Marshalled<Content> {
    return content as Content
  }
}

export type Marshall = ReturnType<typeof construct>
