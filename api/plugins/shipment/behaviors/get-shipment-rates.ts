import { SimpleRate } from "@funk/api/plugins/shipment/simple-rate"
import { IS_PRODUCTION } from "@funk/configuration"
import { Enterprise, ShippingCostStrategy } from "@funk/model/commerce/enterprise/enterprise"
import getNetWeight from "@funk/model/commerce/order/behaviors/get-net-weight"
import { Order } from "@funk/model/commerce/order/order"
import fromDecimalString from "@funk/model/commerce/price/behaviors/from-decimal-string"
import { CurrencyCode } from "@funk/model/money/currency-code"
import getShipmentProviderImpl from "./get-shipment-provider"

export interface Options {
  order: Order
  enterprise: Enterprise
}

export function construct(
  shipmentProviderSecret: string,
  getShipmentProvider = getShipmentProviderImpl
)
{
  return async function({
    order,
    enterprise,
  }: Options): Promise<SimpleRate[]>
  {
    const weight = getNetWeight(order)
    const weightInOz = weight.amount // TODO: Convert to ounces before getting rates.
    const shipmentApi = getShipmentProvider(shipmentProviderSecret)

    // This should be an already-verified address.
    const from_address = new shipmentApi.Address(enterprise.shippingFromAddress)
    const to_address = new shipmentApi.Address(order.customer.shippingAddress)
    const parcel = new shipmentApi.Parcel({
      mode: IS_PRODUCTION ? "production" : "test",
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
        name: "Flat Rate Shipping",
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
}

export type GetShippingRate = ReturnType<typeof construct>
