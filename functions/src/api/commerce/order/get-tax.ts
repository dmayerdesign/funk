import getProductForSku from '@funk/functions/helpers/commerce/product/get-product-for-sku'
import populate from '@funk/functions/helpers/data-access/populate'
import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import { DISCOUNTS } from '@funk/model/commerce/discount/discount'
import getTax from '@funk/model/commerce/order/actions/get-tax'
import { MarshalledOrder, PopulatedOrder } from '@funk/model/commerce/order/order'
import { Price } from '@funk/model/commerce/price/price'
import { SKUS } from '@funk/model/commerce/product/sku/sku'

export default createRpcFunction(
  async (request: RequestWithBody<MarshalledOrder>): Promise<Price> =>
  {
    const order = await populate<PopulatedOrder>(request.body, [
      { key: 'skus', collectionPath: SKUS },
      { key: 'discounts', collectionPath: DISCOUNTS },
    ])
    // TODO: Validate that order.customer.billingAddress.zip exists.
    const postalCode = order.customer && order.customer.billingAddress &&
      order.customer.billingAddress.zip || ''

    return getTax({
      order,
      postalCode,
      getProductForSku,
    })
  }
)
