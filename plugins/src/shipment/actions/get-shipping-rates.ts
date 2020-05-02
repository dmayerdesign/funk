import { IS_PRODUCTION } from '@funk/config'
import { Enterprise, ShippingCostStrategy } from '@funk/model/commerce/enterprise/enterprise'
import getNetWeight from '@funk/model/commerce/order/actions/get-net-weight'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import fromDecimalString from '@funk/model/commerce/price/actions/from-decimal-string'
import { CurrencyCode } from '@funk/model/commerce/price/currency-code'
import { SimpleRate } from '@funk/plugins/shipment/simple-rate'
import getShipmentProviderImpl from './get-shipment-provider'

export interface Options {
  order: PopulatedOrder
  enterprise: Enterprise
}

export const construct = ({
  getShipmentProvider,
  shippingProviderSecret,
}: {
  getShipmentProvider: typeof getShipmentProviderImpl
  shippingProviderSecret: string
}) =>
  async function({
    order,
    enterprise,
  }: Options): Promise<SimpleRate[]>
  {
    const weight = getNetWeight(order)
    const weightInOz = weight.amount // TODO: Convert to ounces before getting rates.
    const shipmentApi = getShipmentProvider(shippingProviderSecret)

    // This should be an already-verified address.
    const from_address = new shipmentApi.Address(enterprise.shippingFromAddress)
    const to_address = new shipmentApi.Address(order.customer.shippingAddress)
    const parcel = new shipmentApi.Parcel({
      mode: IS_PRODUCTION ? 'production' : 'test',
      weight: weightInOz,
    })
    const { rates } = await new shipmentApi.Shipment({
      to_address,
      from_address,
      parcel,
    })
    .save()
    const firstRate = rates[0]

    if (enterprise.shippingCostStrategy === ShippingCostStrategy.FLAT_RATE)
    {
      return [{
        name: 'Flat Rate Shipping',
        carrier: enterprise.shippingCarrierDefault,
        price: enterprise.shippingFlatRate!,
        deliveryDateEstimate: new Date(firstRate.delivery_date).getTime(),
        deliveryDateEstimateIsGuaranteed: firstRate.delivery_date_guaranteed,
      }]
    }
    else
    {
      return rates.map((rate: any) => ({
        name: `${rate.carrier} ${rate.delivery_days}-day`,
        carrier: rate.carrier,
        price: fromDecimalString(rate.rate, CurrencyCode.USD),
        deliveryDateEstimate: new Date(rate.delivery_date).getTime(),
        deliveryDateEstimateIsGuaranteed: rate.delivery_date_guaranteed,
      }))
    }
  }
