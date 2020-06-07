import { MarshalledSku, PopulatedSku } from "@funk/model/commerce/sku/sku"
import { Populate as ExecutePopulate } from "@funk/plugins/persistence/actions/populate"

export function construct(executePopulate: ExecutePopulate): typeof populate

export default function populate(sku: MarshalledSku): Promise<PopulatedSku>

export type Populate = ReturnType<typeof construct>
