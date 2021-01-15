import { Address } from "@funk/model/address/address"
import { merge } from "lodash"

export function createFakeAddress(customProps: Partial<Address> = {}): Address {
  return merge(
    {
      name: "fake name",
      company: "fake company",
      street1: "fake street1",
      street2: "fake street2",
      city: "fake city",
      state: "fake state",
      country: "fake country",
      zip: "fake zip",
      phone: "fake phone",
    },
    customProps,
  )
}
