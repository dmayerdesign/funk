import { ImportedSku } from "@funk/api/commerce/sku/_imported-sku"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"

export default function(importedSku: ImportedSku): MarshalledSku
{
  const sku = {
    name: importedSku["Name"],
  } as MarshalledSku

  return sku
}
