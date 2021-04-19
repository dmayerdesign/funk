import getOrderByIdImpl, {
  GetById as GetOrderById,
} from "@funk/commerce/order/application/internal/behaviors/persistence/get-by-id"
import updateOrderByIdImpl, {
  UpdateById as UpdateOrderById,
} from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import { Cart, Status } from "@funk/commerce/order/model/order"
import { InvalidOrderError } from "@funk/commerce/order/model/validation"
import listSkusImpl, {
  List as ListSkus,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/list"
import setManySkusImpl, {
  SetMany as SetManySkus,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/set-many"
import getIsInStock from "@funk/commerce/sku/model/behaviors/get-is-in-stock"
import { FiniteInventory } from "@funk/commerce/sku/model/inventory"
import { Sku } from "@funk/commerce/sku/model/sku"
import throwPresentableError from "@funk/helpers/throw-presentable-error"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { SKUS_OUT_OF_STOCK_ERROR } from "@funk/ui/copy/error-messages"

export function construct(
  getOrderById: GetOrderById,
  listSkus: ListSkus,
  updateOrderById: UpdateOrderById,
  setManySkus: SetManySkus,
) {
  return async function (cartId: PrimaryKey): Promise<void> {
    const cart = (await getOrderById(cartId)) as Cart
    const skus = await listSkus({
      pagination: {
        skip: 0,
        take: cart.skus!.length ?? 0,
        orderBy: "updatedAt",
        orderByDirection: "desc",
      },
      conditions: [["id", "in", cart.skus!.map(({ id }) => id)]],
    })
    const skusOutOfStock = skus.filter((sku) => !getIsInStock(sku))

    if (skusOutOfStock.length > 0) {
      throwPresentableError(
        new InvalidOrderError(
          SKUS_OUT_OF_STOCK_ERROR +
            " " +
            skusOutOfStock.map((sku) => sku.name).join(", "),
        ),
      )
    } else {
      await updateOrderById(cartId, { status: Status.CART_CHECKOUT } as Cart)
      await setManySkus(
        skus
          .filter((sku) => sku.inventory.type === "finite")
          .reduce(
            (skuUpdates, sku) =>
              ({
                ...skuUpdates,
                [sku.id]: {
                  inventory: {
                    ...sku.inventory,
                    quantityReserved:
                      (sku.inventory as FiniteInventory).quantityReserved +
                      cart.skuQuantityMap[sku.id],
                  },
                },
              } as Partial<Sku>),
            {},
          ),
      )
    }
  }
}

export default construct(
  getOrderByIdImpl,
  listSkusImpl,
  updateOrderByIdImpl,
  setManySkusImpl,
)

export type SetStatusToCheckout = ReturnType<typeof construct>
