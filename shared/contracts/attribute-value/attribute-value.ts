import { Attribute } from '../attribute/attribute'
import { Entity } from '../data-access/entity'

export interface AttributeValue extends Entity {
    slug: string
    value: any
    attribute: Attribute
    name?: string
    description?: string
}
