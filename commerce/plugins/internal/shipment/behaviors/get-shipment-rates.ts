import {
  Enterprise,
  ShippingCostStrategy,
} from "@funk/commerce/enterprise/model/enterprise"
import getNetWeight from "@funk/commerce/order/model/behaviors/get-net-weight"
import { Order } from "@funk/commerce/order/model/order"
import getShipmentProviderImpl from "@funk/commerce/plugins/internal/shipment/behaviors/get-shipment-provider"
import { SimpleRate } from "@funk/commerce/plugins/internal/shipment/simple-rate"
import fromDecimalString from "@funk/commerce/price/model/behaviors/from-decimal-string"
import { CONFIGURATION } from "@funk/configuration"
import { Configuration } from "@funk/configuration/model/configuration"
import { CurrencyCode } from "@funk/money/model/currency-code"

export interface Options {
  order: Order
  enterprise: Enterprise
}

export function construct(
  shipmentProviderSecret: string,
  getShipmentProvider: typeof getShipmentProviderImpl,
) {
  return async function ({
    order,
    enterprise,
  }: Options): Promise<SimpleRate[]> {
    const weight = getNetWeight(order)
    const weightInOz = weight.amount // TODO: Convert to ounces before getting rates.
    const shipmentApi = getShipmentProvider(shipmentProviderSecret)

    // This should be an already-verified address.
    const from_address = new shipmentApi.Address(enterprise.shippingFromAddress)
    const to_address = new shipmentApi.Address(order.customer.shippingAddress)
    const parcel = new shipmentApi.Parcel({
      mode: CONFIGURATION === Configuration.PRODUCTION ? "production" : "test",
      weight: weightInOz,
    })
    const { rates } = await new shipmentApi.Shipment({
      to_address,
      from_address,
      parcel,
    }).save()
    const firstRate = rates[0]

    if (enterprise.shippingCostStrategy === ShippingCostStrategy.FLAT_RATE) {
      return [
        {
          name: "Flat Rate Shipping",
          carrier: enterprise.shippingCarrierDefault,
          price: enterprise.shippingFlatRate!,
          deliveryDateEstimate: new Date(firstRate.delivery_date).getTime(),
          deliveryDateEstimateIsGuaranteed: firstRate.delivery_date_guaranteed,
        },
      ]
    } else {
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
