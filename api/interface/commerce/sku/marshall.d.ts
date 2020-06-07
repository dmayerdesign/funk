import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import { Marshall as ExecuteMarshall } from "@funk/plugins/persistence/actions/marshall"

export function construct(executeMarshall: ExecuteMarshall): typeof marshall

export default function marshall(sku: Sku): MarshalledSku

export type Marshall = ReturnType<typeof construct>
