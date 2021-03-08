import { Inventory } from "@funk/commerce/sku/model/inventory"
import { Sku } from "@funk/commerce/sku/model/sku"

export default function (sku: Sku): boolean | undefined {
  const inventory = sku.inventory as Inventory

  if (inventory.type === "infinite") {
    return true
  }
  if (inventory.type === "bucket" && typeof inventory.bucket === "string") {
    return inventory.bucket !== "out_of_stock"
  }
  if (inventory.type === "finite" && typeof inventory.quantity === "number") {
    return inventory.quantity - inventory.quantityReserved > 0
  }
  return undefined
}
