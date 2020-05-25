import { PopulatedOrder } from "@funk/model/commerce/order/order"
import { Sku } from "@funk/model/commerce/product/sku/sku"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { uniqBy } from "lodash"

export default function(
  populatedOrder: PopulatedOrder,
  options: {
    sku: Sku
    quantity: number
  }
): PopulatedOrder
{
  const { sku, quantity } = options
  const _populatedOrder = { ...populatedOrder }
  let _skuQuantityMap = { ..._populatedOrder.skuQuantityMap }
  let _skus = [..._populatedOrder.skus] as Sku[]
  if (quantity === 0)
  {
    const indexOfPopulatedSku = _skus.findIndex(({ id }) => id === sku.id)
    _skus = removeSku(_skus, indexOfPopulatedSku)
    _skuQuantityMap = setQuantityToZero(_skuQuantityMap, sku.id)
  }
  else
  {
    _skus = [ ..._skus, sku ]
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
  skuId: PrimaryKey): { [x: string]: number }
{
  const _quantities = { ...quantities }
  delete _quantities[skuId]
  return _quantities
}

function removeSku(
  skus: Sku[],
  indexOfSku: number): Sku[]
{
  const _skus = [ ...skus ]
  if (indexOfSku > -1)
  {
    _skus.splice(indexOfSku, 1)
  }
  return _skus
}
