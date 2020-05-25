import { Product } from "@funk/model/commerce/product/product"
import { Sku } from "@funk/model/commerce/product/sku/sku"

export default function(sku: Sku): Promise<Product>
