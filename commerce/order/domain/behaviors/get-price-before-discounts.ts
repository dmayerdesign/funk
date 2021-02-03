import { Order } from "@funk/commerce/order/domain/order"
import { NULL_PRICE, Price } from "@funk/commerce/price/domain/price"
import { MarshalledSku } from "@funk/commerce/sku/domain/sku"
import add from "@funk/money/domain/behaviors/add"
import { CurrencyCode } from "@funk/money/domain/currency-code"

export default function (order: Pick<Order, "skus">): Price {
  const currency = order?.skus?.[0]?.price?.currency ?? CurrencyCode.USD
  return (order?.skus ?? ([] as MarshalledSku[])).reduce(
    (totalPrice, sku) => add(totalPrice, sku.price),
    { ...NULL_PRICE, currency },
  )
}
