import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { Dimensions } from '@funk/model/dimensions/dimensions'
import { Weight } from '@funk/model/weight/weight'

export interface Parcel extends DatabaseDocument {
  weight: Weight
  dimensions: Dimensions
}
