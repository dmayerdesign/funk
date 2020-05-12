import auditOnWrite from '@funk/functions/helpers/audit/on-write'
import createWriteHandler from '@funk/functions/helpers/listen/create-write-handler'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'

export default createWriteHandler(PRODUCTS, auditOnWrite<Product>(`audit.${PRODUCTS}`))