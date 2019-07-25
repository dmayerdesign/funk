import { Entity } from '../data-access/entity'

export interface Image extends Entity {
    large?: string
    medium?: string
    thumbnail?: string
}
