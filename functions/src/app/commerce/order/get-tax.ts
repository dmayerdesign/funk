import createRpcFunction from "@funk/functions/helpers/http/create-rpc-function"
import mapRequestToBody from "@funk/functions/helpers/http/map-request-to-body"
import getTax from "@funk/api/commerce/order/get-tax"

export default createRpcFunction(
  mapRequestToBody(getTax)
)
