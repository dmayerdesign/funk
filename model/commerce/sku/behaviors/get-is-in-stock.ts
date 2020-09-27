import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"

export default function(sku: Sku | MarshalledSku): boolean | undefined
{
  if (sku.inventory.type === "infinite")
  {
    return true
  }
  if (sku.inventory.type === "bucket" && typeof sku.inventory.bucket === "string")
  {
    return sku.inventory.bucket !== "out_of_stock"
  }
  if (sku.inventory.type === "finite" && typeof sku.inventory.quantity === "number")
  {
    return (sku.inventory.quantity - sku.inventory.quantityReserved) > 0
  }
  return undefined
}
