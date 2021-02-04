import {
    Cart,
    MarshalledCart,
    ORDERS,
    Status
} from "@funk/commerce/order/model/order"
import { InvalidOrderError } from "@funk/commerce/order/model/validation"
import getIsInStock from "@funk/commerce/sku/model/behaviors/get-is-in-stock"
import { FiniteInventory } from "@funk/commerce/sku/model/inventory"
import { MarshalledSku, SKUS } from "@funk/commerce/sku/model/sku"
import throwPresentableError from "@funk/helpers/throw-presentable-error"
import getByIdImpl, {
    GetById
} from "@funk/persistence/application/internal/behaviors/get-by-id"
import listImpl, {
    List
} from "@funk/persistence/application/internal/behaviors/list"
import setManyImpl, {
    SetMany
} from "@funk/persistence/application/internal/behaviors/set-many"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { SKUS_OUT_OF_STOCK_ERROR } from "@funk/ui/copy/error-messages"

export function construct(getById: GetById, list: List, setMany: SetMany) {
  return async function (cartId: PrimaryKey): Promise<void> {
    const cart = await getById<MarshalledCart>(ORDERS, cartId)
    const skus = await list<MarshalledSku>({
      collection: SKUS,
      pagination: {
        skip: 0,
        take: cart?.skus?.length ?? 0,
        orderBy: "updatedAt",
        orderByDirection: "desc",
      },
      conditions: [["id", "in", cart!.skus]],
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
      await setMany({
        [ORDERS]: {
          [cartId]: { status: Status.CART_CHECKOUT } as Cart,
        },
        [SKUS]: skus
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
                      cart!.skuQuantityMap[sku.id],
                  },
                },
              } as Partial<MarshalledSku>),
            {},
          ),
      })
    }
  }
}

export default construct(getByIdImpl, listImpl, setManyImpl)

export type SetStatusToCheckout = ReturnType<typeof construct>
