import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import { Marshall as ExecuteMarshall } from "@funk/plugins/persistence/actions/marshall"

export declare function construct(executeMarshall: ExecuteMarshall): typeof marshall

export default marshall
declare function marshall(sku: Sku): MarshalledSku

export type Marshall = ReturnType<typeof construct>
