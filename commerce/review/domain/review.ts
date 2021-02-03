import { ReviewRating } from "@funk/commerce/review/domain/review-rating"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"
import { PrimaryKey } from "@funk/persistence/domain/primary-key"

export interface Review extends DatabaseDocument {
  authorId: PrimaryKey
  productId: PrimaryKey
  ratings?: ReviewRating[]
  body: string
}

export const REVIEWS = "commerce.reviews"
