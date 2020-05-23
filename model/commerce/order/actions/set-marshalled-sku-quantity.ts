import { MarshalledOrder } from '@funk/model/commerce/order/order'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { uniq } from 'lodash'

export default function(
  marshalledOrder: MarshalledOrder,
  options: {
    skuId: PrimaryKey
    quantity: number
  },
): MarshalledOrder
{
  const { skuId, quantity } = options
  const _marshalledOrder = { ...marshalledOrder }
  let _skuQuantityMap = { ...marshalledOrder.skuQuantityMap }
  let _skuIds = [ ..._marshalledOrder.skus ]

  if (quantity === 0)
  {
    const indexOfMarshalledSku = _skuIds.indexOf(skuId)
    _skuIds = removeSkuId(_skuIds, indexOfMarshalledSku)
    _skuQuantityMap = setQuantityToZero(_skuQuantityMap, skuId)
  }
  else
  {
    _skuIds = uniq([ ..._skuIds, skuId ])
    _skuQuantityMap[skuId] = quantity
  }

  return {
    ..._marshalledOrder,
    skuQuantityMap: _skuQuantityMap,
    skus: _skuIds,
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

