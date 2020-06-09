/* eslint-disable @typescript-eslint/indent */
import { PopulatedOrder } from "@funk/model/commerce/order/order"
import { Price } from "@funk/model/commerce/price/price"
import { DbDocumentInput } from "@funk/model/data-access/database-document"
import getByIdImpl from "@funk/plugins/persistence/actions/get-by-id"

export function construct(getById: typeof getByIdImpl): typeof getTotalBeforeTaxAndShipping

export default function getTotalBeforeTaxAndShipping(
  order: DbDocumentInput<PopulatedOrder>): Promise<Price>

export type GetTotalBeforeTaxAndShipping = ReturnType<typeof construct>
