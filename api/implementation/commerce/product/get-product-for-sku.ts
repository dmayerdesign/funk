import { MarshalledProduct, PRODUCTS } from "@funk/model/commerce/product/product"
import { Sku } from "@funk/model/commerce/sku/sku"
import getByIdImpl from "@funk/plugins/persistence/actions/get-by-id"

export function construct(getById = getByIdImpl)
{
  return function(sku: Sku): Promise<MarshalledProduct | undefined>
  {
    return getById<MarshalledProduct>(PRODUCTS, sku.productId)
  }
}

export default construct()

export type GetProductForSku = ReturnType<typeof construct>
