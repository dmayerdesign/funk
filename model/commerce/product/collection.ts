import { Product } from './product'

export enum CollectionType
{
  CART = 'CART',
  WISHLIST = 'WISHLIST',
  CUSTOM = 'CUSTOM',
}

export interface Collection
{
  products: Product[]
  userId?: string
  type?: CollectionType
  displayName?: string
}

export interface ProductCollections
{
  [uid: string]: Collection[]
}
