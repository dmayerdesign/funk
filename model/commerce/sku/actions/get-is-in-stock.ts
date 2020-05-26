import { Sku } from "@funk/model/commerce/sku/sku"

export default function(sku: Sku): boolean | undefined
{
  if (sku.inventory.type === "infinite")
  {
    return true
  }
  if (sku.inventory.type === "finite" && typeof sku.inventory.quantity === "number")
  {
    return sku.inventory.quantity < 1
  }
  if (sku.inventory.type === "bucket" && typeof sku.inventory.bucket === "string")
  {
    return sku.inventory.bucket !== "out_of_stock"
  }
  return undefined
}
