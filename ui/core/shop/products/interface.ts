import { Product } from '@funk/model/commerce/product/product'
import { Pagination } from '@funk/ui/core/persistence/interface'

export interface Products {
  listPublished(pagination: Pagination): Promise<Product[]>
}
