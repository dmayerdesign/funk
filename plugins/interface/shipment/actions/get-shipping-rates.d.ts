import { Enterprise } from "@funk/model/commerce/enterprise/enterprise"
import { PopulatedOrder } from "@funk/model/commerce/order/order"
import { SimpleRate } from "@funk/plugins/shipment/simple-rate"
import { GetShipmentProvider } from "@funk/plugins/shipment/actions/get-shipment-provider"

export interface Options {
  order: PopulatedOrder
  enterprise: Enterprise
}

export declare const construct: (
  shipmentProviderSecret: string,
  getShipmentProvider: GetShipmentProvider
) => (options: Options) => Promise<SimpleRate[]>

export type GetShippingRate = ReturnType<typeof construct>
