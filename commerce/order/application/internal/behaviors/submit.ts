import populateImpl, {
  Populate,
} from "@funk/commerce/order/application/internal/behaviors/populate"
import createOrderForCustomer from "@funk/commerce/order/domain/behaviors/create-order-for-customer"
import {
  MarshalledOrder,
  ORDERS,
  Status,
} from "@funk/commerce/order/domain/order"
import { SKUS } from "@funk/commerce/sku/domain/sku"
import createUid from "@funk/helpers/create-uid"
import throwInvalidInputIfNilOrEmpty from "@funk/helpers/throw-invalid-input-if-nil-or-empty"
import confirmPaymentIntentImpl, {
  ConfirmPaymentIntent,
} from "@funk/money/plugins/internal/payment/behaviors/confirm-payment-intent"
import getByIdImpl, {
  GetById,
} from "@funk/persistence/application/internal/behaviors/get-by-id"
import setManyImpl, {
  SetMany,
} from "@funk/persistence/application/internal/behaviors/set-many"
import updateByIdImpl, {
  UpdateById,
} from "@funk/persistence/application/internal/behaviors/update-by-id"

export function construct(
  getById: GetById,
  updateById: UpdateById,
  setMany: SetMany,
  populate: Populate,
  confirmPaymentIntent: ConfirmPaymentIntent,
) {
  return async function (orderId: string) {
    const marshalledOrder = await getById<MarshalledOrder>(ORDERS, orderId)

    throwInvalidInputIfNilOrEmpty(
      marshalledOrder?.skus?.[0],
      "The order must contain SKUs.",
    )

    const order = await populate(marshalledOrder!)

    await updateById(ORDERS, orderId, { status: Status.PAYMENT_PENDING })
    await confirmPaymentIntent(order.paymentIntentId!)

    await setMany({
      [ORDERS]: {
        [orderId]: {
          status: Status.PAID,
        },
        [createUid()]: createOrderForCustomer(order.customer),
      },
      [SKUS]: order.skus!.reduce(
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
    })
  }
}

export type Submit = ReturnType<typeof construct>

export default construct(
  getByIdImpl,
  updateByIdImpl,
  setManyImpl,
  populateImpl,
  confirmPaymentIntentImpl,
)
