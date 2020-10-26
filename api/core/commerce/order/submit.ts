import populateImpl, { Populate } from "@funk/api/core/commerce/order/populate"
import confirmPaymentIntentImpl, {
  ConfirmPaymentIntent
} from "@funk/api/plugins/payment/behaviors/confirm-payment-intent"
import getByIdImpl, {
  GetById
} from "@funk/api/plugins/persistence/behaviors/get-by-id"
import setManyImpl, {
  SetMany
} from "@funk/api/plugins/persistence/behaviors/set-many"
import updateByIdImpl, {
  UpdateById
} from "@funk/api/plugins/persistence/behaviors/update-by-id"
import createUid from "@funk/helpers/create-uid"
import throwInvalidInputIfNilOrEmpty from "@funk/helpers/throw-invalid-input-if-nil-or-empty"
import createOrderForCustomer from "@funk/model/commerce/order/behaviors/create-order-for-customer"
import {
  MarshalledOrder,
  ORDERS,
  Status
} from "@funk/model/commerce/order/order"
import { SKUS } from "@funk/model/commerce/sku/sku"

export function construct(
  getById: GetById,
  updateById: UpdateById,
  setMany: SetMany,
  populate: Populate,
  confirmPaymentIntent: ConfirmPaymentIntent
) {
  return async function (orderId: string) {
    const marshalledOrder = await getById<MarshalledOrder>(ORDERS, orderId)

    throwInvalidInputIfNilOrEmpty(
      marshalledOrder?.skus?.[0],
      "The order must contain SKUs."
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
        {}
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
  confirmPaymentIntentImpl
)
