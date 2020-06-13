import { MarshalledProduct, Product } from "@funk/model/commerce/product/product"
import { Populate as ExecutePopulate } from "@funk/plugins/persistence/actions/populate"

export function construct(executePopulate: ExecutePopulate): typeof populate

export default function populate(product: MarshalledProduct): Promise<Product>
