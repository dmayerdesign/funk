import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import { Populate as ExecutePopulate } from "@funk/plugins/persistence/actions/populate"

export declare function construct(executePopulate: ExecutePopulate<Sku, MarshalledSku>):
  typeof populate

export default populate
declare function populate(sku: MarshalledSku): Promise<Sku>

export type Populate = ReturnType<typeof construct>
