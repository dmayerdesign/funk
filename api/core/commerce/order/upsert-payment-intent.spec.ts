import { GetTax } from "@funk/api/core/commerce/order/get-sales-tax"
import { GetTotalBeforeTaxAndShipping } from "@funk/api/core/commerce/order/get-total-before-tax-and-shipping"
import { Populate } from "@funk/api/core/commerce/order/populate"
import { construct } from "@funk/api/core/commerce/order/upsert-payment-intent"
import { ChangeHandler } from "@funk/api/plugins/cloud-function/listen/change-handler"
import { OnlyKeys } from "@funk/api/plugins/cloud-function/listen/only-keys"
import { CreatePaymentIntent } from "@funk/api/plugins/payment/behaviors/create-payment-intent"
import { UpdatePaymentIntent } from "@funk/api/plugins/payment/behaviors/update-payment-intent"
import { MIN_TRANSACTION_CENTS } from "@funk/api/plugins/payment/configuration"
import { PaymentIntent } from "@funk/api/plugins/payment/intent"
import { UpdateById } from "@funk/api/plugins/persistence/behaviors/update-by-id"
import { Change, ChangeContext } from "@funk/api/plugins/persistence/change"
import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"
import { Price } from "@funk/model/commerce/price/price"
import { CurrencyCode } from "@funk/model/money/currency-code"

const PAYMENT_INTENT_ID = "payment intent id"
const ORDER_ID = "order id"

describe("upsertPaymentIntent", function () {
  let before: MarshalledOrder | undefined
  let after: MarshalledOrder | undefined
  let change: Change<MarshalledOrder>
  let changeContext: ChangeContext

  let createPaymentIntent: CreatePaymentIntent
  let updatePaymentIntent: UpdatePaymentIntent
  let getTotalBeforeTaxAndShipping: GetTotalBeforeTaxAndShipping
  let getTax: GetTax
  let populate: Populate
  let onlyKeys: OnlyKeys
  let updateById: UpdateById

  it("should not create a payment intent if the customer has no billing zip code", async function () {
    before = undefined
    after = {} as MarshalledOrder
    getTax = jest.fn().mockImplementation(() => {
      throw new Error("fake missing zip code error")
    })
    const upsertPaymentIntent = newUpsertPaymentIntent()

    try {
      await upsertPaymentIntent(change, changeContext)
    } catch {
      expect(populate).toHaveBeenCalled()
      expect(getTax).toHaveBeenCalled()
      expect(createPaymentIntent).not.toHaveBeenCalled()
    }
  })

  it(
    "should not create a payment intent if the order total is less than the minimum " +
      "transaction amount",
    async function () {
      before = undefined
      after = {} as MarshalledOrder
      getTotalBeforeTaxAndShipping = jest.fn().mockReturnValue({
        amount: MIN_TRANSACTION_CENTS - 1,
        currency: CurrencyCode.USD,
      } as Price)
      getTax = jest.fn().mockReturnValue({
        amount: 0,
        currency: CurrencyCode.USD,
      } as Price)
      const upsertPaymentIntent = newUpsertPaymentIntent()

      try {
        await upsertPaymentIntent(change, changeContext)
      } catch {
        expect(populate).toHaveBeenCalled()
        expect(getTotalBeforeTaxAndShipping).toHaveBeenCalled()
        expect(createPaymentIntent).not.toHaveBeenCalled()
      }
    }
  )

  it("should create a payment intent", async function () {
    before = undefined
    after = { id: ORDER_ID } as MarshalledOrder
    const upsertPaymentIntent = newUpsertPaymentIntent()

    await upsertPaymentIntent(change, changeContext)

    expect(populate).toHaveBeenCalled()
    expect(onlyKeys).toHaveBeenCalledWith(
      expect.not.arrayContaining(["paymentIntentId"]),
      expect.any(Function)
    )
    expect(createPaymentIntent).toHaveBeenCalled()
    expect(updatePaymentIntent).not.toHaveBeenCalled()
    expect(updateById).toHaveBeenCalledWith(ORDERS, ORDER_ID, {
      paymentIntentId: PAYMENT_INTENT_ID,
    })
  })

  it("should update a payment intent if data has changed", async function () {
    before = undefined
    after = {
      id: ORDER_ID,
      paymentIntentId: PAYMENT_INTENT_ID,
    } as MarshalledOrder
    const upsertPaymentIntent = newUpsertPaymentIntent()

    await upsertPaymentIntent(change, changeContext)

    expect(populate).toHaveBeenCalled()
    expect(createPaymentIntent).not.toHaveBeenCalled()
    expect(updatePaymentIntent).toHaveBeenCalled()
    expect(updateById).not.toHaveBeenCalled()
  })

  function newUpsertPaymentIntent() {
    return construct(
      createPaymentIntent,
      updatePaymentIntent,
      getTotalBeforeTaxAndShipping,
      getTax,
      populate,
      onlyKeys,
      updateById
    )
  }

  beforeEach(() => {
    change = ({
      before: { data: () => before },
      after: { data: () => after },
    } as unknown) as Change<MarshalledOrder>
    changeContext = ({} as unknown) as ChangeContext

    const PAYMENT_INTENT = { id: PAYMENT_INTENT_ID } as PaymentIntent
    createPaymentIntent = jest.fn().mockResolvedValue(PAYMENT_INTENT)
    updatePaymentIntent = jest.fn().mockResolvedValue(PAYMENT_INTENT)
    getTotalBeforeTaxAndShipping = jest
      .fn()
      .mockResolvedValue({ amount: 1000, currency: CurrencyCode.USD })
    getTax = jest
      .fn()
      .mockResolvedValue({ amount: 60, currency: CurrencyCode.USD })
    populate = jest.fn().mockImplementation(async (order) => order)
    onlyKeys = jest.fn().mockImplementation((_: any, fn: ChangeHandler) => fn)
    updateById = jest.fn()
  })
})
