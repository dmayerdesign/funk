import { LengthUnit } from '@funk/model/units/length-unit'

export interface Dimensions {
  unit: LengthUnit
  x: number
  y: number
  z?: number
}
