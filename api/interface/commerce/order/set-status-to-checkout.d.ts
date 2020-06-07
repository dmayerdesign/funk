import { PrimaryKey } from "@funk/model/data-access/primary-key"
import updateByIdImpl from "@funk/plugins/persistence/actions/update-by-id"

export const construct: (
  updateById: typeof updateByIdImpl
) => typeof setStatusToCheckout

export default function setStatusToCheckout(cartId: PrimaryKey): Promise<void>

export type SetStatusToCheckout = ReturnType<typeof construct>
