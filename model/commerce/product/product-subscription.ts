import { Price } from '@funk/model/commerce/price/price'
import { TaxonomyTerm } from '@funk/model/commerce/taxonomy/taxonomy-term'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Timestamp } from '@funk/model/data-access/timestamp'
import { ImageGroup } from '@funk/model/image/image-group'
import { Duration } from '@funk/model/time/duration'

/** https://support.google.com/merchants/answer/7052112?hl=en&ref_topic=6324338 */
export interface ProductSubscription extends DatabaseDocument {
  productSkuIds: PrimaryKey[]
  imageGroups?: ImageGroup[]
  defaultImageGroupId?: PrimaryKey
  price?: Price
  /** Represents `subscriptionPeriod` and `subscriptionPeriodLength` */
  duration: Duration
  period?: 'month'|'year'
  periodLength?: number
  totalSales: number
  existsInStripe: boolean
  releaseDate?: Timestamp
  reviews?: PrimaryKey[]
  /**
   * A `ProductSku` may have multiple `TaxonomyTerms` per `Taxonomy`.
   * This field should only store terms which are not present in the associated `Product`
   * and which do not apply to all sibling `ProductSkus`.
   */
  taxonomyTerms: TaxonomyTerm[]
  title: string
  description: string
}
