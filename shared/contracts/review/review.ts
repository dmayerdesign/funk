import { DatabaseDocument } from '../data-access/database-document'
import { PrimaryKey } from '../data-access/primary-key'
import { ReviewRating } from './review-rating'

export interface Review extends DatabaseDocument {
  authorId: PrimaryKey
  productId: PrimaryKey
  ratings?: ReviewRating[]
  body: string
}
