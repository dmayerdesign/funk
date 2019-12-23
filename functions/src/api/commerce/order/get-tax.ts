import getProductForSku from '@funk/functions/helpers/commerce/product/get-product-for-sku'
import populate from '@funk/functions/helpers/data-access/populate'
import createFunction from '@funk/functions/helpers/http/create-function'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import { DISCOUNTS } from '@funk/model/commerce/discount/discount'
import getTax, { Input as GetTaxInput } from '@funk/model/commerce/order/actions/get-tax'
import { MarshalledOrder, PopulatedOrder } from '@funk/model/commerce/order/order'
import { Price } from '@funk/model/commerce/price/price'
import { SKUS } from '@funk/model/commerce/product/sku/sku'
import getTaxRateForPostalCode from '@funk/plugins/tax/actions/get-tax-rate-for-postal-code'

export default createFunction(
  async (request: RequestWithBody<MarshalledOrder>): Promise<Price> =>
  {
    const order = await populate<PopulatedOrder>(request.body, [
      { key: 'skus', collectionPath: SKUS },
      { key: 'discounts', collectionPath: DISCOUNTS },
    ])
    const postalCode = order.customer.billingAddress.zip
    const input: GetTaxInput = {
      order,
      taxRate: await getTaxRateForPostalCode({ postalCode }),
      getProduct: getProductForSku,
    }
    return getTax(input)
  }
)
