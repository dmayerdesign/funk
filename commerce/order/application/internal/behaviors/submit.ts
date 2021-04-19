import getOrderByIdImpl, {
  GetById as GetOrderById,
} from "@funk/commerce/order/application/internal/behaviors/persistence/get-by-id"
import populateImpl, {
  Populate,
} from "@funk/commerce/order/application/internal/behaviors/persistence/populate"
import setManyOrdersImpl, {
  SetMany as SetManyOrders,
} from "@funk/commerce/order/application/internal/behaviors/persistence/set-many"
import updateOrderByIdImpl, {
  UpdateById as UpdateOrderById,
} from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import createOrderForCustomer from "@funk/commerce/order/model/behaviors/create-order-for-customer"
import { Status } from "@funk/commerce/order/model/order"
import setManySkusImpl, {
  SetMany as SetManySkus,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/set-many"
import createUid from "@funk/helpers/create-uid"
import throwInvalidInputIfNilOrEmpty from "@funk/helpers/throw-invalid-input-if-nil-or-empty"
import confirmPaymentIntentImpl, {
  ConfirmPaymentIntent,
} from "@funk/money/plugins/internal/payment/behaviors/confirm-payment-intent"

export function construct(
  getOrderById: GetOrderById,
  updateOrderById: UpdateOrderById,
  setManyOrders: SetManyOrders,
  setManySkus: SetManySkus,
  populate: Populate,
  confirmPaymentIntent: ConfirmPaymentIntent,
) {
  return async function (orderId: string) {
    const marshalledOrder = await getOrderById(orderId)

    throwInvalidInputIfNilOrEmpty(
      marshalledOrder?.skus?.[0],
      "The order must contain SKUs.",
    )

    const order = await populate(marshalledOrder!)

    await updateOrderById(orderId, { status: Status.PAYMENT_PENDING })
    await confirmPaymentIntent(order!.paymentIntentId!)
    await setManySkus(
      order.skus!.reduce(
        (skusBatchUpdate, sku) => ({
          ...skusBatchUpdate,
          [sku.id]: {
            inventory:
              sku.inventory.type === "finite"
                ? {
                    ...sku.inventory,
                    quantity:
                      sku.inventory.quantity - order.skuQuantityMap[sku.id],
                    quantityReserved:
                      sku.inventory.quantityReserved -
                      order.skuQuantityMap[sku.id],
                  }
                : {},
          },
        }),
        {},
      ),
    )
    await setManyOrders({
      [orderId]: {
        status: Status.PAID,
      },
      [createUid()]: createOrderForCustomer(order.customer),
    })
  }
}

export type Submit = ReturnType<typeof construct>

export default construct(
  getOrderByIdImpl,
  updateOrderByIdImpl,
  setManyOrdersImpl,
  setManySkusImpl,
  populateImpl,
  confirmPaymentIntentImpl,
)
