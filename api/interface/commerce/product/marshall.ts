import { MarshalledProduct, Product } from "@funk/model/commerce/product/product"
import { Marshall as ExecuteMarshall } from "@funk/plugins/persistence/actions/marshall"

export declare function construct(executeMarshall: ExecuteMarshall): typeof marshall

export default marshall
declare function marshall(product: Product): MarshalledProduct

export type Marshall = ReturnType<typeof construct>
