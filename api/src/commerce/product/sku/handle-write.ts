import { ChangeHandler } from '@funk/functions/helpers/listen/change-handler'
import { MarshalledProductAttributeValues } from
  '@funk/model/commerce/attribute/attribute-value'
import { MarshalledProduct, PRODUCTS } from '@funk/model/commerce/product/product'
import { MarshalledSku, SKUS } from '@funk/model/commerce/product/sku/sku'
import listImpl from '@funk/plugins/persistence/actions/list'
import updateByIdImpl from '@funk/plugins/persistence/actions/update-by-id'
import { TAKE_ALL } from '@funk/plugins/persistence/pagination'
import { uniq } from 'lodash'

export const construct = ({
  list = listImpl,
  updateById = updateByIdImpl,
} = {}) =>
{
  return async function({ after }): Promise<void>
  {
    const sku = after.data()!
    const skus = await list<MarshalledSku>({
      collection: SKUS,
      conditions: [[ 'productId', '==', sku.productId ]],
      pagination: { take: TAKE_ALL, skip: 0, orderBy: 'id', orderByDirection: 'desc' },
    })
    await updateById(PRODUCTS, sku.productId!, {
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
