import createRpcFunction from "@funk/functions/helpers/http/create-rpc-function"
import mapRequestToBody from "@funk/functions/helpers/http/map-request-to-body"
import { construct as constructGetTax } from "@funk/model/commerce/order/actions/get-tax"

export default createRpcFunction(
  mapRequestToBody(constructGetTax(getProductForSku))
)
