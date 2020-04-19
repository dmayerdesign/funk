import { Customer } from '@funk/model/commerce/order/customer/customer'
import { construct } from '@funk/plugins/tax/actions/get-tax-rate-for-postal-code'

export function customerWithGoodPostalCode(): Customer
{
  return {
    billingAddress: {
      zip: '32805',
    },
  } as Customer
}

export function customerWithBadPostalCode(): Customer
{
  return {
    billingAddress: {
      street1: 'street 1 test',
    },
  } as Customer
}

xdescribe('getTaxRateForPostalCode', () =>
{
  it('should construct', () =>
  {
    expect(construct).toBeTruthy()
  })
})
