import { Entity } from '../data-access/entity'

export interface Attribute extends Entity {
  slug: string
  singularName?: string
  pluralName?: string
  description?: string
}
