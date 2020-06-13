import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import { Populate as ExecutePopulate } from "@funk/plugins/persistence/actions/populate"

export function construct(executePopulate: ExecutePopulate): typeof populate

export default function populate(sku: MarshalledSku): Promise<Sku>

export type Populate = ReturnType<typeof construct>
