import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Sku } from "@funk/model/commerce/sku/sku"
import { GetById } from "@funk/plugins/persistence/actions/get-by-id"

export function construct(getById: GetById): typeof exports.default

export default function(sku: Sku): Promise<MarshalledProduct | undefined>

export type GetProductForSku = ReturnType<typeof construct>
