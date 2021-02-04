import { LengthUnit } from "@funk/things/model/dimensions/length-unit";

export interface Dimensions {
  unit: LengthUnit
  /** Length */
  x: number
  /** Height */
  y: number
  /** Width */
  z?: number
}
