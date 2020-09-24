import { isNil, omitBy } from "lodash"

export default function<ValueType extends Record<string, unknown>>(value: ValueType): ValueType
{
  return omitBy<ValueType>(value, isNil) as ValueType
}
