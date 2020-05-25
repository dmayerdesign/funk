import { MarshalledProduct, PRODUCTS } from "@funk/model/commerce/product/product"
import { Sku } from "@funk/model/commerce/product/sku/sku"
import getById from "@funk/plugins/persistence/actions/get-by-id"

export default function(sku: Sku): Promise<MarshalledProduct | undefined>
{
  return getById<MarshalledProduct>(PRODUCTS, sku.productId)
}
