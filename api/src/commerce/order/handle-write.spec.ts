import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"
import { construct } from "@funk/api/commerce/order/handle-write"
import { Change, ChangeContext } from "@funk/plugins/persistence/change"
import { ChangeHandler } from "@funk/functions/helpers/listen/change-handler"
import { CurrencyCode } from "@funk/model/commerce/price/currency-code"
import { Price } from "@funk/model/commerce/price/price"
import { PaymentIntent } from "@funk/plugins/payment/intent"
import { MIN_TRANSACTION_CENTS } from "@funk/plugins/payment/config"

const PAYMENT_INTENT_ID = "payment intent id"
const ORDER_ID = "order id"

describe("orderHandleWrite", () =>
{
  it("should not create a payment intent if the customer has no billing zip code",
    async (done) =>
    {
      const BEFORE = undefined
      const AFTER = {} as MarshalledOrder
      const deps = setUp(BEFORE, AFTER)
      const getTax = jasmine.createSpy().and.throwError("fake missing zip code error")
      const constructGetTax = () => async () => getTax()
      const handleWrite = construct({
        ...deps,
        constructGetTax,
      })
      const {
        change,
        changeContext,
        populate,
        constructCreatePaymentIntent,
      } = deps

      await handleWrite(change, changeContext)

      expect(populate).toHaveBeenCalled()
      expect(getTax).toHaveBeenCalled()
      expect(constructCreatePaymentIntent).not.toHaveBeenCalled()
      done()
    })

  it(
    "should not create a payment intent if the order total is less than the minimum "
    + "transaction amount",
    async (done) =>
    {
      const BEFORE = undefined
      const AFTER = {} as MarshalledOrder
      const deps = setUp(BEFORE, AFTER)
      const getTotalBeforeTax = jasmine.createSpy().and.returnValue({
        amount: MIN_TRANSACTION_CENTS - 1,
        currency: CurrencyCode.USD,
      } as Price)
      const constructGetTotalBeforeTax = () => async () => getTotalBeforeTax()
      const getTax = jasmine.createSpy().and.returnValue({
        amount: 0,
        currency: CurrencyCode.USD,
      } as Price)
      const constructGetTax = () => async () => getTax()
      const handleWrite = construct({
        ...deps,
        constructGetTotalBeforeTax,
        constructGetTax,
      })
      const {
        change,
        changeContext,
        populate,
        constructCreatePaymentIntent,
      } = deps

      await handleWrite(change, changeContext)

      expect(populate).toHaveBeenCalled()
      expect(getTotalBeforeTax).toHaveBeenCalled()
      expect(constructCreatePaymentIntent).not.toHaveBeenCalled()
      done()
    })

  it("should create a payment intent", async (done) =>
  {
    const BEFORE = undefined
    const AFTER = { id: ORDER_ID } as MarshalledOrder
    const deps = setUp(BEFORE, AFTER)
    const handleWrite = construct(deps)
    const {
      change,
      changeContext,
      populate,
      ignoringKeys,
      constructCreatePaymentIntent,
      constructUpdatePaymentIntent,
      getSecret,
      updateById,
    } = deps

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
    const BEFORE = undefined
    const AFTER = { id: ORDER_ID, paymentIntentId: PAYMENT_INTENT_ID } as MarshalledOrder
    const deps = setUp(BEFORE, AFTER)
    const handleWrite = construct(deps)
    const {
      change,
      changeContext,
      populate,
      ignoringKeys,
      constructCreatePaymentIntent,
      constructUpdatePaymentIntent,
      getSecret,
      updateById,
    } = deps

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
})

const setUp = (before: MarshalledOrder | undefined, after: MarshalledOrder | undefined) =>
{
  const PAYMENT_INTENT = { id: PAYMENT_INTENT_ID } as PaymentIntent
  const change = {
    before: { data: () => before },
    after: { data: () => after },
  } as unknown as Change<MarshalledOrder>
  const changeContext = {} as unknown as ChangeContext
  const constructGetTotalBeforeTax = jasmine.createSpy().and.returnValue(
    async () => ({ amount: 1000, currency: CurrencyCode.USD }) as Price
  )
  const constructGetTax = jasmine.createSpy().and.returnValue(
    async () => ({ amount: 60, currency: CurrencyCode.USD }) as Price
  )
  const populate = jasmine.createSpy().and.callFake(async (order) => order)
  const getProductForSku = jasmine.createSpy()
  const constructCreatePaymentIntent = jasmine.createSpy().and.returnValue(
    async () => PAYMENT_INTENT
  )
  const constructUpdatePaymentIntent = jasmine.createSpy().and.returnValue(
    async () => PAYMENT_INTENT
  )
  const getSecret = jasmine.createSpy()
  const updateById = jasmine.createSpy()
  const ignoringKeys = jasmine.createSpy().and.callFake(
    (_: any, fn: ChangeHandler) => fn
  )

  return {
    change,
    changeContext,
    constructGetTotalBeforeTax,
    constructGetTax,
    populate,
    getProductForSku,
    ignoringKeys,
    constructCreatePaymentIntent,
    constructUpdatePaymentIntent,
    getSecret,
    updateById,
  }
}
