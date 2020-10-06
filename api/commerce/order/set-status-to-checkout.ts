import getByIdImpl, { GetById } from "@funk/api/plugins/persistence/behaviors/get-by-id"
import listImpl, { List } from "@funk/api/plugins/persistence/behaviors/list"
import setManyImpl, { SetMany } from "@funk/api/plugins/persistence/behaviors/set-many"
import { SKUS_OUT_OF_STOCK_ERROR } from "@funk/copy/error-messages"
import throwPresentableError from "@funk/helpers/throw-presentable-error"
import { Cart, MarshalledCart, ORDERS, Status } from "@funk/model/commerce/order/order"
import { InvalidOrderError } from "@funk/model/commerce/order/validation"
import getIsInStock from "@funk/model/commerce/sku/behaviors/get-is-in-stock"
import { FiniteInventory } from "@funk/model/commerce/sku/inventory"
import { MarshalledSku, SKUS } from "@funk/model/commerce/sku/sku"
import { PrimaryKey } from "@funk/model/data-access/primary-key"

export function construct(
  getById: GetById,
  list: List,
  setMany: SetMany
)
{
  return async function(cartId: PrimaryKey): Promise<void>
  {
    const cart = await getById<MarshalledCart>(ORDERS, cartId)
    const skus = await list<MarshalledSku>({
      collection: SKUS,
      pagination: {
        skip: 0,
        take: cart?.skus?.length ?? 0,
        orderBy: "updatedAt",
        orderByDirection: "desc",
      },
      conditions: [
        [ "id", "in", cart!.skus ],
      ],
    })
    const skusOutOfStock = skus.filter((sku) => !getIsInStock(sku))

    if (skusOutOfStock.length > 0)
    {
      throwPresentableError(new InvalidOrderError(
        SKUS_OUT_OF_STOCK_ERROR + " " +
        skusOutOfStock.map((sku) => sku.name).join(", ")
      ))
    }
    else
    {
      await setMany({
        [ORDERS]: {
          [cartId]: { status: Status.CART_CHECKOUT } as Cart,
        },
        [SKUS]: skus
          .filter((sku) => sku.inventory.type === "finite")
          .reduce(
            (skuUpdates, sku) => ({
              ...skuUpdates,
              [sku.id]: {
                inventory: {
                  ...sku.inventory,
                  quantityReserved: (sku.inventory as FiniteInventory).quantityReserved
                    + cart!.skuQuantityMap[sku.id],
                },
              },
            } as Partial<MarshalledSku>),
            {}),
      })
    }
  }
}

export default construct(
  getByIdImpl,
  listImpl,
  setManyImpl
)

export type SetStatusToCheckout = ReturnType<typeof construct>
