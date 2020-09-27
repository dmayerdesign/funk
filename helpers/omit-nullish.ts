import { isNil, omitBy } from "lodash"

export default function<ValueType extends Record<string, any>>(value: ValueType): ValueType
{
  return omitBy<ValueType>(value, isNil) as ValueType
}
