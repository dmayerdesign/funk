import { Duration } from "@funk/model/time/duration"
import { TimeUnit } from "@funk/model/units/time-unit"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"

export default function (durationString?: string): Duration | undefined {
  if (!durationString) return undefined

  const amountStr = durationString.trim().match(/^[0-9,\.]+/g)?.[0]
  const unit = durationString.trim().match(/[A-Za-z][A-Za-z\/\d]+$/g)?.[0] as
    | TimeUnit
    | undefined
  let amount: number

  try {
    amount = parseFloat(amountStr!.replace(/,/g, ""))
    if (!unit) throw new Error()
  } catch (error) {
    throw new InvalidInputError(
      `Could not parse the duration string: ${durationString}`,
    )
  }
  return { amount, unit }
}
