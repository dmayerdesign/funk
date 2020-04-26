import { isNil, omitBy } from 'lodash'

export default function<ValueType extends object>(value: ValueType): ValueType
{
  return omitBy<ValueType>(value, isNil) as ValueType
}
