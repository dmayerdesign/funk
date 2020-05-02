import { Enterprise, ShippingCostStrategy } from '@funk/model/commerce/enterprise/enterprise'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import { CurrencyCode } from '@funk/model/commerce/price/currency-code'
import { createFakeSku } from '@funk/model/commerce/product/sku/spec'
import { construct } from '@funk/plugins/shipment/actions/get-shipping-rates'
import { SimpleRate } from '@funk/plugins/shipment/simple-rate'
import { constructGetShipmentProviderStub } from '../stubs'

describe('getShippingRates for by-weight shipping cost strategy', () =>
{
  it('should get a single shipping rate for an order', async (done) =>
  {
    const {
      ORDER,
      ENTERPRISE,
      shippingProviderSecret,
      getShipmentProvider,
      sspInstance,
      saveShipment,
      getShippingRates,
    } = setUp(ShippingCostStrategy.WEIGHT)
    const expected: SimpleRate[] = [
      {
        name: 'USPS 4-day',
        carrier: 'USPS',
        price: { amount: 950, currency: CurrencyCode.USD },
        deliveryDateEstimate: new Date('2013-04-26T05:40:57Z').getTime(),
        deliveryDateEstimateIsGuaranteed: false,
      },
    ]
    spyOn(sspInstance, 'Address')
    spyOn(sspInstance, 'Parcel')

    const rates = await getShippingRates({ order: ORDER, enterprise: ENTERPRISE })

    expect(getShipmentProvider).toHaveBeenCalledWith(shippingProviderSecret)
    expect(sspInstance.Address).toHaveBeenCalledTimes(2)
    expect(sspInstance.Address).toHaveBeenCalledWith(ENTERPRISE.shippingFromAddress)
    expect(sspInstance.Address).toHaveBeenCalledWith(ORDER.customer.shippingAddress)
    expect(sspInstance.Parcel).toHaveBeenCalledTimes(1)
    expect(sspInstance.Parcel).toHaveBeenCalledWith({
      mode: 'test',
      weight: 2,
    })
    expect(saveShipment).toHaveBeenCalledTimes(1)
    expect(rates).toEqual(expected)
    done()
  })
})

describe('getShippingRates for flat-rate shipping cost strategy', () =>
{
  it('should get a single shipping rate for an order', async (done) =>
  {
    const {
      ORDER,
      ENTERPRISE,
      shippingProviderSecret,
      getShipmentProvider,
      sspInstance,
      saveShipment,
      getShippingRates,
    } = setUp(ShippingCostStrategy.FLAT_RATE)
    const expected: SimpleRate[] = [
      {
        name: 'Flat Rate Shipping',
        carrier: 'TEST_CARRIER',
        price: { amount: 500, currency: CurrencyCode.USD },
        deliveryDateEstimate: new Date('2013-04-26T05:40:57Z').getTime(),
        deliveryDateEstimateIsGuaranteed: false,
      },
    ]
    spyOn(sspInstance, 'Address')
    spyOn(sspInstance, 'Parcel')

    const rates = await getShippingRates({ order: ORDER, enterprise: ENTERPRISE })

    expect(getShipmentProvider).toHaveBeenCalledWith(shippingProviderSecret)
    expect(sspInstance.Address).toHaveBeenCalledTimes(2)
    expect(sspInstance.Address).toHaveBeenCalledWith(ENTERPRISE.shippingFromAddress)
    expect(sspInstance.Address).toHaveBeenCalledWith(ORDER.customer.shippingAddress)
    expect(sspInstance.Parcel).toHaveBeenCalledTimes(1)
    expect(sspInstance.Parcel).toHaveBeenCalledWith({
      mode: 'test',
      weight: 2,
    })
    expect(saveShipment).toHaveBeenCalledTimes(1)
    expect(rates).toEqual(expected)
    done()
  })
})

const setUp = (shippingCostStrategy: ShippingCostStrategy) =>
{
  const ORDER = {
    customer: {
      shippingAddress: {},
    },
    skus: [
      { ...createFakeSku('1'), price: { amount: 1000, currency: CurrencyCode.USD } },
    ],
  } as PopulatedOrder
  const ENTERPRISE = {
    shippingFromAddress: {},
    shippingCostStrategy,
    shippingCarrierDefault: 'TEST_CARRIER',
    shippingFlatRate: { amount: 500, currency: CurrencyCode.USD },
  } as Enterprise
  const shippingProviderSecret = 'TEST_SSP_SECRET'
  const {
    getShipmentProvider,
    saveShipment,
    sspInstance,
  } = constructGetShipmentProviderStub()
  const getShippingRates = construct({
    shippingProviderSecret,
    getShipmentProvider,
  })
  saveShipment.and.callFake(async () => ({
    rates: [
      {
        service: 'FirstClassPackageInternationalService',
        rate: '9.50',
        carrier: 'USPS',
        delivery_days: 4,
        delivery_date: '2013-04-26T05:40:57Z',
        delivery_date_guaranteed: false,
      },
    ],
  }))
  return {
    ORDER,
    ENTERPRISE,
    shippingProviderSecret,
    sspInstance,
    saveShipment,
    getShipmentProvider,
    getShippingRates,
  }
}
