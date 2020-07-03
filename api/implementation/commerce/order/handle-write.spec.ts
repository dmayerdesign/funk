import { GetSecret } from "@funk/api/admin/get-secret"
import ignoringKeysImpl from "@funk/functions/helpers/listen/ignoring-keys"
import { UpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { construct as ConstructCreatePaymentIntent } from
  "@funk/plugins/payment/actions/create-payment-intent"
import { construct as ConstructUpdatePaymentIntent } from
  "@funk/plugins/payment/actions/update-payment-intent"
import { GetTotalBeforeTaxAndShipping } from
  "@funk/api/commerce/order/get-total-before-tax-and-shipping"
import { GetTax } from
  "@funk/api/commerce/order/get-tax"
import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"
import { construct } from "@funk/api/commerce/order/handle-write"
import { Change, ChangeContext } from "@funk/plugins/persistence/change"
import { ChangeHandler } from "@funk/functions/helpers/listen/change-handler"
import { CurrencyCode } from "@funk/model/money/currency-code"
import { Price } from "@funk/model/commerce/price/price"
import { PaymentIntent } from "@funk/plugins/payment/intent"
import { MIN_TRANSACTION_CENTS } from "@funk/plugins/payment/config"
import { Populate } from "@funk/api/commerce/order/populate"

const PAYMENT_INTENT_ID = "payment intent id"
const ORDER_ID = "order id"

describe("orderHandleWrite", () =>
{
  let before: MarshalledOrder | undefined
  let after: MarshalledOrder | undefined
  let change: Change<MarshalledOrder>
  let changeContext: ChangeContext

  let constructCreatePaymentIntent: typeof ConstructCreatePaymentIntent
  let constructUpdatePaymentIntent: typeof ConstructUpdatePaymentIntent
  let getTotalBeforeTaxAndShipping: GetTotalBeforeTaxAndShipping
  let getTax: GetTax
  let getSecret: GetSecret
  let populate: Populate
  let ignoringKeys: typeof ignoringKeysImpl
  let updateById: UpdateById

  it("should not create a payment intent if the customer has no billing zip code",
    async (done) =>
    {
      before = undefined
      after = {} as MarshalledOrder
      getTax = jasmine.createSpy().and.throwError("fake missing zip code error")
      const handleWrite = constructHandleWrite()

      try
      {
        await handleWrite(change, changeContext)
      }
      catch
      {
        expect(populate).toHaveBeenCalled()
        expect(getTax).toHaveBeenCalled()
        expect(constructCreatePaymentIntent).not.toHaveBeenCalled()
      }
      done()
    })

  it(
    "should not create a payment intent if the order total is less than the minimum "
    + "transaction amount",
    async (done) =>
    {
      before = undefined
      after = {} as MarshalledOrder
      getTotalBeforeTaxAndShipping = jasmine.createSpy().and.returnValue({
        amount: MIN_TRANSACTION_CENTS - 1,
        currency: CurrencyCode.USD,
      } as Price)
      getTax = jasmine.createSpy().and.returnValue({
        amount: 0,
        currency: CurrencyCode.USD,
      } as Price)
      const handleWrite = constructHandleWrite()

      try
      {
        await handleWrite(change, changeContext)
      }
      catch
      {
        expect(populate).toHaveBeenCalled()
        expect(getTotalBeforeTaxAndShipping).toHaveBeenCalled()
        expect(constructCreatePaymentIntent).not.toHaveBeenCalled()
      }
      done()
    })

  it("should create a payment intent", async (done) =>
  {
    before = undefined
    after = { id: ORDER_ID } as MarshalledOrder
    const handleWrite = constructHandleWrite()

    await handleWrite(change, changeContext)

    expect(populate).toHaveBeenCalled()
    expect(ignoringKeys).toHaveBeenCalledWith(
      [ "paymentIntentId" ], expect.any(Function)
    )
    expect(constructCreatePaymentIntent).toHaveBeenCalled()
    expect(constructUpdatePaymentIntent).not.toHaveBeenCalled()
    expect(getSecret).toHaveBeenCalled()
    expect(updateById).toHaveBeenCalledWith(ORDERS, ORDER_ID,
      { paymentIntentId: PAYMENT_INTENT_ID })
    done()
  })

  it("should update a payment intent", async (done) =>
  {
    before = undefined
    after = { id: ORDER_ID, paymentIntentId: PAYMENT_INTENT_ID } as MarshalledOrder
    const handleWrite = constructHandleWrite()

    await handleWrite(change, changeContext)

    expect(populate).toHaveBeenCalled()
    expect(ignoringKeys).toHaveBeenCalledWith(
      [ "paymentIntentId" ], expect.any(Function)
    )
    expect(constructCreatePaymentIntent).not.toHaveBeenCalled()
    expect(constructUpdatePaymentIntent).toHaveBeenCalled()
    expect(getSecret).toHaveBeenCalled()
    expect(updateById).not.toHaveBeenCalled()
    done()
  })

  function constructHandleWrite()
  {
    return construct(
      constructCreatePaymentIntent,
      constructUpdatePaymentIntent,
      getTotalBeforeTaxAndShipping,
      getTax,
      getSecret,
      populate,
      ignoringKeys,
      updateById
    )
  }

  beforeEach(() =>
  {
    change = {
      before: { data: () => before },
      after: { data: () => after },
    } as unknown as Change<MarshalledOrder>
    changeContext = {} as unknown as ChangeContext

    const PAYMENT_INTENT = { id: PAYMENT_INTENT_ID } as PaymentIntent
    constructCreatePaymentIntent = jasmine.createSpy().and.returnValue(
      async () => PAYMENT_INTENT
    )
    constructUpdatePaymentIntent = jasmine.createSpy().and.returnValue(
      async () => PAYMENT_INTENT
    )
    getTotalBeforeTaxAndShipping = jasmine.createSpy().and.returnValue(
      Promise.resolve<Price>({ amount: 1000, currency: CurrencyCode.USD })
    )
    getTax = jasmine.createSpy().and.returnValue(
      Promise.resolve<Price>({ amount: 60, currency: CurrencyCode.USD })
    )
    getSecret = jasmine.createSpy()
    populate = jasmine.createSpy().and.callFake(async (order) => order)
    ignoringKeys = jasmine.createSpy().and.callFake(
      (_: any, fn: ChangeHandler) => fn
    )
    updateById = jasmine.createSpy()
  })
})

