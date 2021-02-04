import { ReviewRating } from "@funk/commerce/review/model/review-rating"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export interface Review extends DatabaseDocument {
  authorId: PrimaryKey
  productId: PrimaryKey
  ratings?: ReviewRating[]
  body: string
}

export const REVIEWS = "commerce.reviews"
