import { Order } from "@funk/commerce/order/model/order"
import { MarshalledSku } from "@funk/commerce/sku/model/sku"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { uniqBy } from "lodash"

export default function (
  populatedOrder: Order,
  options: {
    sku: MarshalledSku
    quantity: number
  },
): Order {
  const { sku, quantity } = options
  const _populatedOrder = { ...populatedOrder }
  let _skuQuantityMap = { ..._populatedOrder.skuQuantityMap }
  let _skus = (!!_populatedOrder.skus
    ? [..._populatedOrder.skus]
    : []) as MarshalledSku[]
  if (quantity === 0) {
    const indexOfSku = _skus.findIndex(({ id }) => id === sku.id)
    _skus = removeSku(_skus, indexOfSku)
    _skuQuantityMap = setQuantityToZero(_skuQuantityMap, sku.id)
  } else {
    _skus = [..._skus, sku]
    _skuQuantityMap[sku.id] = quantity
  }
  _populatedOrder.skus = uniqBy(_skus, "id")

  return {
    ..._populatedOrder,
    skuQuantityMap: _skuQuantityMap,
    skus: _skus,
  }
}

function setQuantityToZero(
  quantities: { [x: string]: number },
  skuId: PrimaryKey,
): { [x: string]: number } {
  const _quantities = { ...quantities }
  delete _quantities[skuId]
  return _quantities
}

function removeSku(skus: MarshalledSku[], indexOfSku: number): MarshalledSku[] {
  const _skus = [...skus]
  if (indexOfSku > -1) {
    _skus.splice(indexOfSku, 1)
  }
  return _skus
}
