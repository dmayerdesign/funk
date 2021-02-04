import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import { WeightUnit } from "@funk/units/model/weight-unit"
import { Weight } from "@funk/weight/model/weight"

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
      `Could not parse the weight string: ${weightString}`,
    )
  }
  return { amount, unit }
}
