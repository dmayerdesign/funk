export interface FiniteInventory {
  type: "finite"
  quantity: number
  quantityPending: number
}
export interface FiniteInventoryDisplayedAsBucket {
  type: "finite"
  quantity: number
  quantityPending: number
  bucket: "in_stock" | "limited" | "out_of_stock"
}
export interface InfiniteInventory {
  type: "infinite"
}
export interface BucketInventory {
  type: "bucket"
  bucket: "in_stock" | "limited" | "out_of_stock"
}

export type Inventory =
  FiniteInventory
  | InfiniteInventory
  | BucketInventory
  | FiniteInventoryDisplayedAsBucket
