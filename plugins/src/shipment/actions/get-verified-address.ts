import omitNullish from "@funk/helpers/omit-nullish"
import { Address } from "@funk/model/address/address"
import getShipmentProviderImpl from "./get-shipment-provider"

export function construct({
  getShipmentProvider = getShipmentProviderImpl,
  shipmentProviderSecret,
}: {
  getShipmentProvider: typeof getShipmentProviderImpl
  shipmentProviderSecret: string
})
{
  return async function(address: Address): Promise<Address | undefined>
  {
    const shipmentApi = getShipmentProvider(shipmentProviderSecret)
    const verifiedAddressOrError = await new shipmentApi.Address(address).save()
    if (!verifiedAddressOrError || verifiedAddressOrError.error)
    {
      return undefined
    }
    return omitNullish({
      name: verifiedAddressOrError.name,
      company: verifiedAddressOrError.company,
      street1: verifiedAddressOrError.street1,
      street2: verifiedAddressOrError.street2,
      city: verifiedAddressOrError.city,
      state: verifiedAddressOrError.state,
      zip: verifiedAddressOrError.zip,
      country: verifiedAddressOrError.country,
    })
  }
}
