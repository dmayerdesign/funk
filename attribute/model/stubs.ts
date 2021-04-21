import { kebabCase } from "lodash"
import { AttributeValue } from "./attribute-value"

export function createFakeAttributeValue({
  attributeId = "fake attribute id",
  displayValue = "fake attribute value name",
} = {}): AttributeValue {
  const id = kebabCase(displayValue)
  return {
    id,
    slug: id,
    attributeId,
    displayValue,
  }
}
