import { PrimaryKey } from "@funk/model/data-access/primary-key"
import updateByIdImpl from "@funk/plugins/persistence/actions/update-by-id"

export declare const construct: (
  updateById: typeof updateByIdImpl
) => typeof setStatusToCheckout

declare function setStatusToCheckout(cartId: PrimaryKey): Promise<void>
export default setStatusToCheckout

export type SetStatusToCheckout = ReturnType<typeof construct>
