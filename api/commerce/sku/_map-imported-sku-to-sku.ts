import { ImportedSku } from "@funk/api/commerce/sku/_imported-sku"
import parseCsvBoolean from "@funk/helpers/csv/parse-csv-boolean"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import fromDecimalString from "@funk/model/commerce/price/actions/from-decimal-string"
import weightFromString from "@funk/model/weight/actions/from-string"
import { Inventory, InventoryShorthand } from "@funk/model/commerce/sku/inventory"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"
import { CurrencyCode } from "@funk/model/money/currency-code"
import omitNullish from "@funk/helpers/omit-nullish"
import durationFromString from "@funk/model/time/actions/duration-from-string"
import { MarshalledSkuAttributeValues } from "@funk/model/commerce/attribute/attribute-value"
import { flatMap, kebabCase } from "lodash"
import parseCsvNumber from "@funk/helpers/csv/parse-csv-number"

export default function(importedSku: ImportedSku): MarshalledSku
{
  return omitNullish<MarshalledSku>({
    id: importedSku["SKU"],
    name: importedSku["Name"],
    description: importedSku["Description"],
    productId: importedSku["Group SKU"],
    price: fromDecimalString(importedSku["Price"], CurrencyCode.USD)!,
    inventory: parseInventory(importedSku["Inventory"] as InventoryShorthand),
    netWeight: weightFromString(importedSku["Net weight"])!,
    isDefaultSku: parseCsvBoolean(importedSku["Is group default"]),
    isAvailableForPreorder: parseCsvBoolean(importedSku["Is available for preorder"]),
    costOfGoodsSold: fromDecimalString(importedSku["COGS"], CurrencyCode.USD),
    unitPricingBaseMeasure: weightFromString(importedSku["Unit pricing base measure"]),
    gtin: importedSku["GTIN"],
    mpn: importedSku["MPN"],
    isAdult: parseCsvBoolean(importedSku["Is adult product"]),
    multipackQuantity: parseCsvNumber(importedSku["Multipack quantity"]),
    isBundle: parseCsvBoolean(importedSku["Is bundle"]),
    shippingLabel: importedSku["Shipping label"] as MarshalledSku["shippingLabel"],
    maxHandlingTime: durationFromString(importedSku["Max handling time"]),
    minHandlingTime: durationFromString(importedSku["Min handling time"]),
    attributeValues: Object.keys(importedSku)
      .filter((key) => key.trim().match(/^Attribute: /))
      .map((key) => [ key, importedSku[key] ])
      .reduce(
        (attributeValues, [ key, value ]) =>
        {
          const attributeId = kebabCase(key.replace(/Attribute: /gi, "").trim())
          attributeValues[attributeId] = kebabCase(value)
          return attributeValues
        },
        {} as MarshalledSkuAttributeValues
      ),
    taxonomyTerms: flatMap(
      Object.keys(importedSku)
        .filter((key) => key.trim().match(/^Taxonomy/))
        .map((key) => importedSku[key].split(",")))
      .map(kebabCase),
  })
}

function parseInventory(inventoryShorthand: InventoryShorthand): Inventory
{
  const inventoryShorthandAsNumber = parseInt(`${inventoryShorthand}`, 10)
  if (typeof inventoryShorthandAsNumber === "number")
  {
    return { type: "finite", quantity: inventoryShorthandAsNumber, quantityPending: 0 }
  }
  if (inventoryShorthand === "infinite")
  {
    return { type: "infinite" }
  }
  if (typeof inventoryShorthand === "string"
    && inventoryShorthand.trim().match(/in_stock|limited|out_of_stock/))
  {
    return { type: "bucket", bucket: inventoryShorthand }
  }
  throw new InvalidInputError(`The inventory shorthand provided was invalid: ${inventoryShorthand}`)
}
