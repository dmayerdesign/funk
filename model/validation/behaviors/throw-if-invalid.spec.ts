import throwIfAddressIsInvalid from "@funk/model/address/validators/throw-if-address-is-invalid"
import { Address } from "@funk/model/address/address"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"

describe("validate", () =>
{
  it("should do nothing if the data is valid", () =>
  {
    const VALID_ADDRESS: Address = {
      street1: "street 1",
      city: "city",
      state: "state",
      zip: "zip",
    }
    let error: InvalidInputError | undefined
    try
    {
      throwIfAddressIsInvalid(VALID_ADDRESS)
    }
    catch (_error)
    {
      error = _error
    }
    expect(error).toBeUndefined()
  })

  it("should throw an InvalidInputError if the data is invalid", () =>
  {
    const INVALID_ADDRESS: Omit<Address, "zip"> = {
      street1: "street 1",
      city: "city",
      state: "state",
      // missing zip
    }
    let error: InvalidInputError | undefined
    try
    {
      throwIfAddressIsInvalid(INVALID_ADDRESS as Address)
    }
    catch (_error)
    {
      error = _error
    }
    expect(error instanceof InvalidInputError).toBe(true)
  })
})
