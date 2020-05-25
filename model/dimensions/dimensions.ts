import { LengthUnit } from "@funk/model/units/length-unit"

export interface Dimensions {
  unit: LengthUnit
  /** Length */
  x: number
  /** Height */
  y: number
  /** Width */
  z?: number
}
