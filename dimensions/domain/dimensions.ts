import { LengthUnit } from "@funk/units/domain/length-unit"

export interface Dimensions {
  unit: LengthUnit
  /** Length */
  x: number
  /** Height */
  y: number
  /** Width */
  z?: number
}
