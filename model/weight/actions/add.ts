import { validateBeforeMath } from '@funk/model/weight/validation'
import { Weight } from '@funk/model/weight/weight'

// TODO: Add ability to convert units. For now, just throw if mismatched.
export default function(weight1: Weight, weight2: Weight): Weight
{
  validateBeforeMath(weight1, weight2)
  return {
    amount: weight1.amount + weight2.amount,
    unit: weight1.unit,
  }
}
