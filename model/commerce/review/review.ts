import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { ReviewRating } from './review-rating'

export interface Review extends DatabaseDocument {
  authorId: PrimaryKey
  productId: PrimaryKey
  ratings?: ReviewRating[]
  body: string
}
