import { Order } from "@funk/model/commerce/order/order"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import add from "@funk/model/money/behaviors/add"
import { CurrencyCode } from "@funk/model/money/currency-code"

export default function (order: Pick<Order, "skus">): Price {
  const currency = order?.skus?.[0]?.price?.currency ?? CurrencyCode.USD
  return (order?.skus ?? ([] as MarshalledSku[])).reduce(
    (totalPrice, sku) => add(totalPrice, sku.price),
    { ...NULL_PRICE, currency },
  )
}
