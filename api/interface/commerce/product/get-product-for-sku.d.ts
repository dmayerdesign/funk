import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Sku } from "@funk/model/commerce/sku/sku"

export default function(sku: Sku): Promise<MarshalledProduct | undefined>
