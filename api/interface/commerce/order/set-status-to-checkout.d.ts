import { PrimaryKey } from "@funk/model/data-access/primary-key"
import setById from "@funk/plugins/persistence/actions/set-by-id"

export const construct: (deps?: {
  setById: typeof setById
}) => typeof setStatusToCheckout

export default function setStatusToCheckout(cartId: PrimaryKey): Promise<void>
