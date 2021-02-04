import { Order } from "@funk/commerce/order/model/order"
import { NULL_PRICE, Price } from "@funk/commerce/price/model/price"
import { MarshalledSku } from "@funk/commerce/sku/model/sku"
import add from "@funk/money/model/behaviors/add"
import { CurrencyCode } from "@funk/money/model/currency-code"

export default function (order: Pick<Order, "skus">): Price {
  const currency = order?.skus?.[0]?.price?.currency ?? CurrencyCode.USD
  return (order?.skus ?? ([] as MarshalledSku[])).reduce(
    (totalPrice, sku) => add(totalPrice, sku.price),
    { ...NULL_PRICE, currency },
  )
}
