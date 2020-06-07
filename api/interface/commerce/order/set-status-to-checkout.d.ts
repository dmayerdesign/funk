import { PrimaryKey } from "@funk/model/data-access/primary-key"
import updateById from "@funk/plugins/persistence/actions/update-by-id"

export const construct: (deps?: {
  updateById: typeof updateById
}) => typeof setStatusToCheckout

export default function setStatusToCheckout(cartId: PrimaryKey): Promise<void>

export type SetStatusToCheckout = ReturnType<typeof construct>
