import { Product } from './product'

export enum ProductCollectionType
{
  CART = 'CART',
  WISHLIST = 'WISHLIST',
  CUSTOM = 'CUSTOM',
}

export interface ProductCollection
{
  products: Product[]
  userId?: string
  type?: ProductCollectionType
  displayName?: string
}

export interface ProductCollections
{
  [uid: string]: ProductCollection[]
}
