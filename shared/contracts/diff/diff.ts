import { Entity } from '../data-access/entity'

export interface Diff extends Entity {
  recordId: any
  previousValue: any
  currentValue: any
}
