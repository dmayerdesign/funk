import { Order } from "@funk/model/commerce/order/order"
import { DbDocumentInput } from "@funk/model/data-access/database-document"

export function construct(): typeof createReceipt

export default function createReceipt(partialOrder: Partial<DbDocumentInput<Order>>): string

export type CreateReceipt = ReturnType<typeof construct>
