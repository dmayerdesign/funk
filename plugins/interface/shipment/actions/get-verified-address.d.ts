import { GetShipmentProvider } from "@funk/plugins/shipment/actions/get-shipment-provider"
import { Address } from "@funk/model/address/address"

export declare const construct: (deps: {
  shipmentProviderSecret: string
  getShipmentProvider: GetShipmentProvider
}) => (address: Address) => Promise<Address | undefined>

export type GetVerifiedAddress = ReturnType<typeof construct>
