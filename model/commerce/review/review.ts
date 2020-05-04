import { ReviewRating } from '@funk/model/commerce/review/review-rating'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'

export interface Review extends DatabaseDocument {
  authorId: PrimaryKey
  productId: PrimaryKey
  ratings?: ReviewRating[]
  body: string
}

export const REVIEWS = 'commerce.reviews'
