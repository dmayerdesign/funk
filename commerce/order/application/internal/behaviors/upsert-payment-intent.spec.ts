import { GetTax } from "@funk/commerce/order/application/internal/behaviors/get-sales-tax"
import { GetTotalBeforeTaxAndShipping } from "@funk/commerce/order/application/internal/behaviors/get-total-before-tax-and-shipping"
import { Populate } from "@funk/commerce/order/application/internal/behaviors/persistence/populate"
import { UpdateById as UpdateOrderById } from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import { construct } from "@funk/commerce/order/application/internal/behaviors/upsert-payment-intent"
import { Order } from "@funk/commerce/order/model/order"
import { Price } from "@funk/commerce/price/model/price"
import { ChangeHandler } from "@funk/http/plugins/internal/cloud-function/behaviors/listen/change-handler"
import { OnlyKeys } from "@funk/http/plugins/internal/cloud-function/behaviors/listen/only-keys"
import { CurrencyCode } from "@funk/money/model/currency-code"
import { CreatePaymentIntent } from "@funk/money/plugins/internal/payment/behaviors/create-payment-intent"
import { UpdatePaymentIntent } from "@funk/money/plugins/internal/payment/behaviors/update-payment-intent"
import { MIN_TRANSACTION_CENTS } from "@funk/money/plugins/internal/payment/configuration"
import { PaymentIntent } from "@funk/money/plugins/internal/payment/intent"
import {
  Change,
  ChangeContext,
} from "@funk/persistence/plugins/internal/events/change"

const PAYMENT_INTENT_ID = "payment intent id"
const ORDER_ID = "order id"

describe("upsertPaymentIntent", () => {
  let before: Order | undefined
  let after: Order | undefined
  let change: Change<Order>
  let changeContext: ChangeContext

  let createPaymentIntent: CreatePaymentIntent
  let updatePaymentIntent: UpdatePaymentIntent
  let getTotalBeforeTaxAndShipping: GetTotalBeforeTaxAndShipping
  let getTax: GetTax
  let populate: Populate
  let onlyKeys: OnlyKeys
  let updateOrderById: UpdateOrderById

  it("should not create a payment intent if the customer has no billing zip code", async () => {
    before = undefined
    after = {} as Order
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
    async () => {
      before = undefined
      after = {} as Order
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
    },
  )

  it("should create a payment intent", async () => {
    before = undefined
    after = { id: ORDER_ID } as Order
    const upsertPaymentIntent = newUpsertPaymentIntent()

    await upsertPaymentIntent(change, changeContext)

    expect(populate).toHaveBeenCalled()
    expect(onlyKeys).toHaveBeenCalledWith(
      expect.not.arrayContaining(["paymentIntentId"]),
      expect.any(Function),
    )
    expect(createPaymentIntent).toHaveBeenCalled()
    expect(updatePaymentIntent).not.toHaveBeenCalled()
    expect(updateOrderById).toHaveBeenCalledWith(ORDER_ID, {
      paymentIntentId: PAYMENT_INTENT_ID,
    })
  })

  it("should update a payment intent if data has changed", async () => {
    before = undefined
    after = {
      id: ORDER_ID,
      paymentIntentId: PAYMENT_INTENT_ID,
    } as Order
    const upsertPaymentIntent = newUpsertPaymentIntent()

    await upsertPaymentIntent(change, changeContext)

    expect(populate).toHaveBeenCalled()
    expect(createPaymentIntent).not.toHaveBeenCalled()
    expect(updatePaymentIntent).toHaveBeenCalled()
    expect(updateOrderById).not.toHaveBeenCalled()
  })

  function newUpsertPaymentIntent() {
    return construct(
      createPaymentIntent,
      updatePaymentIntent,
      getTotalBeforeTaxAndShipping,
      getTax,
      populate,
      onlyKeys,
      updateOrderById,
    )
  }

  beforeEach(() => {
    change = ({
      before: { data: () => before },
      after: { data: () => after },
    } as unknown) as Change<Order>
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
    updateOrderById = jest.fn()
  })
})
