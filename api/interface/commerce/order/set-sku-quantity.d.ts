import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { GetById } from "@funk/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/plugins/persistence/actions/set-by-id"

export function construct(
  getById: GetById,
  setById: ReturnType<typeof constructSetById>
): typeof setSkuQuantity

export default function setSkuQuantity(
  { orderId, skuId, quantity }: {
    orderId: PrimaryKey
    skuId: PrimaryKey
    quantity: number
  }
): Promise<void>

export type SetSkuQuantity = ReturnType<typeof construct>
