/* eslint-disable @typescript-eslint/indent */
import { Order } from "@funk/model/commerce/order/order"
import { Price } from "@funk/model/commerce/price/price"
import { DbDocumentInput } from "@funk/model/data-access/database-document"
import getByIdImpl from "@funk/plugins/persistence/actions/get-by-id"

export declare function construct(getById?: typeof getByIdImpl): typeof getTotalBeforeTaxAndShipping

declare function getTotalBeforeTaxAndShipping(
  order: DbDocumentInput<Order>): Promise<Price>
export default getTotalBeforeTaxAndShipping

export type GetTotalBeforeTaxAndShipping = ReturnType<typeof construct>
