import { Discount } from '@funk/model/commerce/discount/discount'
import { PopulatedOrder, Status } from '@funk/model/commerce/order/order'
import { CurrencyCode } from '@funk/model/commerce/price/currency-code'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DbDocumentInput } from '@funk/model/data-access/database-document'

export function createOrder(): DbDocumentInput<PopulatedOrder>
{
  return {
    skus: [
      { id: 'test_sku_id_1', price: { amount: 1010, currency: 'USD' },
        taxonomyTerms: [ 'tax_term_id_1' ] },
      { id: 'test_sku_id_2', price: { amount: 1000, currency: 'USD' },
        taxonomyTerms: [ 'tax_term_id_2' ] },
      { id: 'test_sku_id_3', price: { amount: 1000, currency: 'USD' },
        taxonomyTerms: [ 'tax_term_id_3' ] },
      { id: 'test_sku_id_4', price: { amount: 1000, currency: 'USD' },
        taxonomyTerms: [ 'tax_term_id_TO_EXCLUDE' ] },
      { id: 'test_sku_id_TO_EXCLUDE', price: { amount: 1000, currency: 'USD' } },
    ] as Sku[],

    discounts: [
      {
        type: 'sku',
        total: { amount: 1000, currency: CurrencyCode.USD },
        includes: {
          skus: [
            'test_sku_id_2',
            'test_sku_id_4',
            'test_sku_id_TO_EXCLUDE',
          ],
          taxonomyTerms: [
            'tax_term_id_1',
            'tax_term_id_2',
            'tax_term_id_3',
            'tax_term_id_TO_EXCLUDE',
          ],
        },
        excludes: {
          skus: [
            'test_sku_id_TO_EXCLUDE',
          ],
          taxonomyTerms: [
            'tax_term_id_TO_EXCLUDE',
          ],
        },
        startAt: Date.now() - 60000000,
        endAt: Date.now() + 60000000,
      },
    ] as Discount[],

    customer: {},

    status: Status.CART,
  }
}
