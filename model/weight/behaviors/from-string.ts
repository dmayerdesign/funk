import { Weight } from "@funk/model/weight/weight"
import { WeightUnit } from "@funk/model/units/weight-unit"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"

export default function (weightString?: string): Weight | undefined {
  if (!weightString) return undefined

  const amountStr = weightString?.trim().match(/^[0-9,\.]+/g)?.[0]
  const unit = weightString?.trim().match(/[A-Za-z][A-Za-z\/\d]+$/g)?.[0] as
    | WeightUnit
    | undefined
  let amount: number

  try {
    amount = parseFloat(amountStr!.replace(/,/g, ""))
    if (!unit) throw new Error()
  } catch (error) {
    throw new InvalidInputError(
      `Could not parse the weight string: ${weightString}`
    )
  }
  return { amount, unit }
}
