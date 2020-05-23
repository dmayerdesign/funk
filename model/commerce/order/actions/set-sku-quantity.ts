import { MarshalledOrder, Order, PopulatedOrder } from '@funk/model/commerce/order/order'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { uniq, uniqBy } from 'lodash'

export default function<OrderType extends Order = Order>(
  order: OrderType,
  options: { sku: Sku, quantity: number },
): OrderType
{
  const marshalledOrder = order as MarshalledOrder
  const populatedOrder = order as PopulatedOrder
  const { sku, quantity } = options
  const isMarshalled = order.skus
    .some((skuOrId: string | Sku) => typeof skuOrId === 'string')

  if (isMarshalled)
  {
    return setMarshalledSkuQuantity(marshalledOrder, sku, quantity) as OrderType
  }
  else
  {
    return setPopulatedSkuQuantity(populatedOrder, sku, quantity) as OrderType
  }
}

function setMarshalledSkuQuantity(
  marshalledOrder: MarshalledOrder,
  sku: Sku,
  quantity: number): MarshalledOrder
{
  const _marshalledOrder = { ...marshalledOrder }
  let _skuQuantityMap = { ...marshalledOrder.skuQuantityMap }
  let _skuIds = [ ..._marshalledOrder.skus ]

  if (quantity === 0)
  {
    const indexOfMarshalledSku = _skuIds.indexOf(sku.id)
    _skuIds = removeSkuId(_skuIds, indexOfMarshalledSku)
    _skuQuantityMap = setQuantityToZero(_skuQuantityMap, sku.id)
  }
  else
  {
    _skuQuantityMap[sku.id] = quantity
    _marshalledOrder.skus = uniq([ ..._skuIds, sku.id ])
  }

  return {
    ..._marshalledOrder,
    skuQuantityMap: _skuQuantityMap,
    skus: _skuIds,
  }
}

function setPopulatedSkuQuantity(
  populatedOrder: PopulatedOrder,
  sku: Sku,
  quantity: number): PopulatedOrder
{
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
  _populatedOrder.skus = uniqBy(_skus, 'id')

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

function removeSkuId(
  skuIds: PrimaryKey[],
  indexOfSku: number): PrimaryKey[]
{
  const _skuIds = [ ...skuIds ]
  if (indexOfSku > -1)
  {
    _skuIds.splice(indexOfSku, 1)
  }
  return _skuIds
}

