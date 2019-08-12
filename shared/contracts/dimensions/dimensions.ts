import { LengthUnit } from '../units/length-unit'

export interface Dimensions {
  unit: LengthUnit
  x: number
  y: number
  z?: number
}
