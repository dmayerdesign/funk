import confirmPaymentIntentImpl, { ConfirmPaymentIntent } from "@funk/api/plugins/payment/behaviors/confirm-payment-intent"
import getByIdImpl, { GetById } from "@funk/api/plugins/persistence/behaviors/get-by-id"
import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"

export function construct(
  getById: GetById,
  confirmPaymentIntent: ConfirmPaymentIntent
)
{
  return async function (orderId: string)
  {
    const order = await getById<MarshalledOrder>(ORDERS, orderId)

    await confirmPaymentIntent(order!.paymentIntentId!)
  }
}

export type Submit = ReturnType<typeof construct>

export default construct(getByIdImpl, confirmPaymentIntentImpl)
