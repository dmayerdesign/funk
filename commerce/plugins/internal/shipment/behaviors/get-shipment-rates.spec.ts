import {
    Enterprise,
    ShippingCostStrategy
} from "@funk/commerce/enterprise/model/enterprise"
import { Order } from "@funk/commerce/order/model/order"
import { construct } from "@funk/commerce/plugins/internal/shipment/behaviors/get-shipment-rates"
import { SimpleRate } from "@funk/commerce/plugins/internal/shipment/simple-rate"
import { createFakeMarshalledSku } from "@funk/commerce/sku/model/stubs"
import { CurrencyCode } from "@funk/money/model/currency-code"
import { constructGetShipmentProviderStub } from "../stubs"

describe("getShippingRates", () => {
  describe("for by-weight shipping cost strategy", () => {
    it("should get a single shipping rate for an order", async function () {
      const {
        ORDER,
        ENTERPRISE,
        shipmentProviderSecret,
        getShipmentProvider,
        sspInstance,
        saveShipment,
        getShippingRates,
      } = setUp(ShippingCostStrategy.WEIGHT)
      const expected: SimpleRate[] = [
        {
          name: "USPS 4-day",
          carrier: "USPS",
          price: { amount: 950, currency: CurrencyCode.USD },
          deliveryDateEstimate: new Date("2013-04-26T05:40:57Z").getTime(),
          deliveryDateEstimateIsGuaranteed: false,
        },
      ]
      spyOn(sspInstance, "Address")
      spyOn(sspInstance, "Parcel")

      const rates = await getShippingRates({
        order: ORDER,
        enterprise: ENTERPRISE,
      })

      expect(getShipmentProvider).toHaveBeenCalledWith(shipmentProviderSecret)
      expect(sspInstance.Address).toHaveBeenCalledTimes(2)
      expect(sspInstance.Address).toHaveBeenCalledWith(
        ENTERPRISE.shippingFromAddress,
      )
      expect(sspInstance.Address).toHaveBeenCalledWith(
        ORDER.customer.shippingAddress,
      )
      expect(sspInstance.Parcel).toHaveBeenCalledTimes(1)
      expect(sspInstance.Parcel).toHaveBeenCalledWith({
        mode: "test",
        weight: 2,
      })
      expect(saveShipment).toHaveBeenCalledTimes(1)
      expect(rates).toEqual(expected)
    })
  })
  describe("for flat-rate shipping cost strategy", () => {
    it("should get a single shipping rate for an order", async function () {
      const {
        ORDER,
        ENTERPRISE,
        shipmentProviderSecret,
        getShipmentProvider,
        sspInstance,
        saveShipment,
        getShippingRates,
      } = setUp(ShippingCostStrategy.FLAT_RATE)
      const expected: SimpleRate[] = [
        {
          name: "Flat Rate Shipping",
          carrier: "TEST_CARRIER",
          price: { amount: 500, currency: CurrencyCode.USD },
          deliveryDateEstimate: new Date("2013-04-26T05:40:57Z").getTime(),
          deliveryDateEstimateIsGuaranteed: false,
        },
      ]
      spyOn(sspInstance, "Address")
      spyOn(sspInstance, "Parcel")

      const rates = await getShippingRates({
        order: ORDER,
        enterprise: ENTERPRISE,
      })

      expect(getShipmentProvider).toHaveBeenCalledWith(shipmentProviderSecret)
      expect(sspInstance.Address).toHaveBeenCalledTimes(2)
      expect(sspInstance.Address).toHaveBeenCalledWith(
        ENTERPRISE.shippingFromAddress,
      )
      expect(sspInstance.Address).toHaveBeenCalledWith(
        ORDER.customer.shippingAddress,
      )
      expect(sspInstance.Parcel).toHaveBeenCalledTimes(1)
      expect(sspInstance.Parcel).toHaveBeenCalledWith({
        mode: "test",
        weight: 2,
      })
      expect(saveShipment).toHaveBeenCalledTimes(1)
      expect(rates).toEqual(expected)
    })
  })
})

const setUp = (shippingCostStrategy: ShippingCostStrategy) => {
  const ORDER = {
    customer: {
      shippingAddress: {},
    },
    skus: [
      {
        ...createFakeMarshalledSku(),
        price: { amount: 1000, currency: CurrencyCode.USD },
      },
    ],
  } as Order
  const ENTERPRISE = {
    shippingFromAddress: {},
    shippingCostStrategy,
    shippingCarrierDefault: "TEST_CARRIER",
    shippingFlatRate: { amount: 500, currency: CurrencyCode.USD },
  } as Enterprise
  const shipmentProviderSecret = "TEST_SSP_SECRET"
  const {
    getShipmentProvider,
    saveShipment,
    sspInstance,
  } = constructGetShipmentProviderStub()
  const getShippingRates = construct(
    shipmentProviderSecret,
    getShipmentProvider,
  )
  saveShipment.and.callFake(async () => ({
    rates: [
      {
        service: "FirstClassPackageInternationalService",
        rate: "9.50",
        carrier: "USPS",
        delivery_days: 4,
        delivery_date: "2013-04-26T05:40:57Z",
        delivery_date_guaranteed: false,
      },
    ],
  }))
  return {
    ORDER,
    ENTERPRISE,
    shipmentProviderSecret,
    sspInstance,
    saveShipment,
    getShipmentProvider,
    getShippingRates,
  }
}
