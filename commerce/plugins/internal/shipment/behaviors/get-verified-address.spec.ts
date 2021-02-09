import { construct } from "@funk/commerce/plugins/internal/shipment/behaviors/get-verified-address"
import { Address } from "@funk/places/model/address"
import { constructGetShipmentProviderStub } from "../stubs"

describe("getVerifiedAddress", () => {
  it("should verify a deliverable address", async () => {
    const {
      FAKE_ADDRESS,
      shipmentProviderSecret,
      sspInstance,
      saveAddress,
      getShipmentProvider,
      getVerifiedAddress,
    } = setUp(true)
    const expected: Address = {
      company: "Verified Company",
      street1: "Verified Street",
      city: "Verified City",
      state: "Verified State",
      zip: "Verified Zip",
      country: "Verified Country",
    }
    spyOn(sspInstance, "Address").and.returnValue({ save: saveAddress })

    const verifiedAddress = await getVerifiedAddress(FAKE_ADDRESS)

    expect(getShipmentProvider).toHaveBeenCalledWith(shipmentProviderSecret)
    expect(sspInstance.Address).toHaveBeenCalledTimes(1)
    expect(sspInstance.Address).toHaveBeenCalledWith(FAKE_ADDRESS)
    expect(saveAddress).toHaveBeenCalledTimes(1)
    expect(verifiedAddress).toEqual(expected)
  })
  it("should verify a not-deliverable address", async () => {
    const {
      FAKE_ADDRESS,
      shipmentProviderSecret,
      sspInstance,
      saveAddress,
      getShipmentProvider,
      getVerifiedAddress,
    } = setUp(false)
    const expected = undefined
    spyOn(sspInstance, "Address").and.returnValue({ save: saveAddress })

    const unverifiedAddress = await getVerifiedAddress(FAKE_ADDRESS)

    expect(getShipmentProvider).toHaveBeenCalledWith(shipmentProviderSecret)
    expect(sspInstance.Address).toHaveBeenCalledTimes(1)
    expect(sspInstance.Address).toHaveBeenCalledWith(FAKE_ADDRESS)
    expect(saveAddress).toHaveBeenCalledTimes(1)
    expect(unverifiedAddress).toEqual(expected)
  })
})

const setUp = (isDeliverable: boolean) => {
  const FAKE_ADDRESS: Address = {
    street1: "Fake Street",
    city: "Fake City",
    state: "Fake State",
    zip: "Fake Zip",
  }
  const shipmentProviderSecret = "TEST_SSP_SECRET"
  const {
    getShipmentProvider,
    saveAddress,
    sspInstance,
  } = constructGetShipmentProviderStub()
  const getVerifiedAddress = construct(
    shipmentProviderSecret,
    getShipmentProvider,
  )

  if (isDeliverable) {
    saveAddress.and.callFake(async () => ({
      name: null,
      company: "Verified Company",
      street1: "Verified Street",
      city: "Verified City",
      state: "Verified State",
      zip: "Verified Zip",
      country: "Verified Country",
      verifications: {
        delivery: {
          success: true,
          errors: [],
        },
      },
    }))
  } else {
    saveAddress.and.callFake(async () => ({
      error: {
        code: "ADDRESS.VERIFY.FAILURE",
        message: "Unable to verify address.",
        errors: [
          {
            code: "E.ADDRESS.NOT_FOUND",
            field: "address",
            message: "Address not found",
          },
        ],
      },
    }))
  }

  return {
    FAKE_ADDRESS,
    shipmentProviderSecret,
    sspInstance,
    saveAddress,
    getShipmentProvider,
    getVerifiedAddress,
  }
}
