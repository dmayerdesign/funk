import { ChangeHandler } from '@funk/functions/helpers/listen/change-handler'
import { MarshalledProductAttributeValues } from
  '@funk/model/commerce/attribute/attribute-value'
import { MarshalledProduct, PRODUCTS } from '@funk/model/commerce/product/product'
import { MarshalledSku, SKUS } from '@funk/model/commerce/product/sku/sku'
import { store as storeImpl } from '@funk/plugins/persistence/server-store'
import { uniq } from 'lodash'

export const construct = ({
  store = storeImpl,
} = {}) =>
{
  return async function({ after }): Promise<void>
  {
    const sku = after.data()!
    const skus = (await store().collection(SKUS)
      .where('productId', '==', sku.productId).get())
      .docs
      .map((snapshot) => snapshot.data()) as MarshalledSku[]
    const productDocRef = store().doc(`${PRODUCTS}/${sku.productId}`)
    await productDocRef.update({
      attributeValues: skus.reduce(
        (attributeValues, _sku) =>
        {
          Object.keys(_sku.attributeValues).forEach((attributeId) =>
          {
            const attributeValue = _sku.attributeValues[attributeId]
            attributeValues[attributeId] = uniq([
              ...(attributeValues[attributeId] ?? []),
              attributeValue,
            ]) as string[] | number[]
          })
          return attributeValues
        },
        {} as MarshalledProductAttributeValues
      ),
    } as Partial<MarshalledProduct>)
  } as ChangeHandler<MarshalledSku>
}

export default construct()
