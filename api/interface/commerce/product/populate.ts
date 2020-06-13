import { MarshalledProduct, Product } from "@funk/model/commerce/product/product"
import { Populate as ExecutePopulate } from "@funk/plugins/persistence/actions/populate"

export declare function construct(
  executePopulate: ExecutePopulate<Product, MarshalledProduct>): typeof populate

export default populate
declare function populate(product: MarshalledProduct): Promise<Product>
