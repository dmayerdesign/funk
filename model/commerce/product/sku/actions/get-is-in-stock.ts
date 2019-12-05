import { Sku } from '@funk/model/commerce/product/sku/sku'

export default function (sku: Sku): boolean | undefined
{
  if (sku.inventory.type === 'infinite')
  {
    return true
  }
  if (sku.inventory.type === 'finite' && typeof sku.inventory.quantity === 'number')
  {
    return sku.inventory.quantity < 1
  }
  if (sku.inventory.type === 'bucket' && typeof sku.inventory.value === 'string')
  {
    return sku.inventory.value !== 'out_of_stock'
  }
  return undefined
}
