import { Order } from '@funk/model/commerce/order/order'
import { DbDocumentInput } from '@funk/model/data-access/database-document'

export default function(partialOrder: Partial<DbDocumentInput<Order>>): string
