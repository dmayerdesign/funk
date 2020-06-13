import { ChangeHandler } from "@funk/functions/helpers/listen/change-handler"
import { MarshalledOrder } from "@funk/model/commerce/order/order"
import { GetSecret } from "@funk/api/admin/get-secret"
import { Populate } from "@funk/api/commerce/order/populate"
import ignoringKeysImpl from "@funk/functions/helpers/listen/ignoring-keys"
import { UpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { construct as ConstructCreatePaymentIntent } from
  "@funk/plugins/payment/actions/create-payment-intent"
import { construct as ConstructUpdatePaymentIntent } from
  "@funk/plugins/payment/actions/update-payment-intent"
import { GetTotalBeforeTaxAndShipping } from
  "@funk/api/commerce/order/get-total-before-tax-and-shipping"
import { GetTax } from
  "@funk/api/commerce/order/get-tax"

declare const handleWrite: ChangeHandler<MarshalledOrder>

export declare const construct: (
  constructCreatePaymentIntent: typeof ConstructCreatePaymentIntent,
  constructUpdatePaymentIntent: typeof ConstructUpdatePaymentIntent,
  getTotalBeforeTaxAndShipping: GetTotalBeforeTaxAndShipping,
  getTax: GetTax,
  getSecret: GetSecret,
  populate: Populate,
  ignoringKeys: typeof ignoringKeysImpl,
  updateById: UpdateById
) => typeof handleWrite

export default handleWrite

export type HandleWrite = ReturnType<typeof construct>
