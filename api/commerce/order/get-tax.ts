import getProductForSku from '@funk/api/commerce/product/get-product-for-sku'
import { ORDER_GET_TAX_MISSING_POSTAL_CODE } from '@funk/copy/error-messages'
import { DISCOUNTS } from '@funk/model/commerce/discount/discount'
import { construct as constructGetTax } from '@funk/model/commerce/order/actions/get-tax'
import { MarshalledOrder, PopulatedOrder } from '@funk/model/commerce/order/order'
import { Price } from '@funk/model/commerce/price/price'
import { SKUS } from '@funk/model/commerce/product/sku/sku'
import { InvalidInputError } from '@funk/model/error/invalid-input-error'
import populate from '@funk/plugins/persistence/actions/populate'

export default async (marshalledOrder: MarshalledOrder): Promise<Price> =>
{
  const order = await populate<PopulatedOrder>(marshalledOrder, [
    { key: 'skus', collectionPath: SKUS },
    { key: 'discounts', collectionPath: DISCOUNTS },
  ])
  const postalCode = order.customer?.billingAddress?.zip

  if (postalCode == null)
  {
    throw new InvalidInputError(ORDER_GET_TAX_MISSING_POSTAL_CODE)
  }

  return constructGetTax({ getProductForSku })(order)
}
