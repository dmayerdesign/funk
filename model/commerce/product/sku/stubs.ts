import { MarshalledSku } from '@funk/model/commerce/product/sku/sku'
import { WeightUnit } from '@funk/model/units/weight-unit'

export const createFakeMarshalledSku = (idSuffix = '0') => ({
  id: `test_sku_id_${idSuffix}`,
  productId: `test_product_id_${idSuffix}`,
  price: { amount: 1000, currency: 'USD' },
  taxonomyTerms: [ `tax_term_id_${idSuffix}` ],
  netWeight: { amount: 2, unit: WeightUnit.OUNCES },
}) as MarshalledSku
