import { ContentPreview } from "@funk/admin/content/model/content-preview"
import {
  Marshall as GenericMarshall,
  Marshalled,
} from "@funk/persistence/application/external/behaviors/marshall"

export function construct(_marshall: GenericMarshall) {
  return function (
    contentPreview: Partial<ContentPreview>,
  ): Marshalled<ContentPreview> {
    return contentPreview as ContentPreview
  }
}

export type Marshall = ReturnType<typeof construct>
