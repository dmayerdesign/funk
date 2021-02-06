import { MarshalledSkuAttributeValues } from "@funk/commerce/attribute/model/attribute-value"
import fromDecimalString from "@funk/commerce/price/model/behaviors/from-decimal-string"
import { ImportedSku } from "@funk/commerce/sku/application/internal/behaviors/_imported-sku"
import {
  Inventory,
  InventoryShorthand,
} from "@funk/commerce/sku/model/inventory"
import { MarshalledSku } from "@funk/commerce/sku/model/sku"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import parseCsvBoolean from "@funk/helpers/csv/parse-csv-boolean"
import parseCsvNumber from "@funk/helpers/csv/parse-csv-number"
import omitNullish from "@funk/helpers/omit-nullish"
import { CurrencyCode } from "@funk/money/model/currency-code"
import weightFromString from "@funk/things/model/weight/behaviors/from-string"
import durationFromString from "@funk/time/model/behaviors/duration-from-string"
import { flatMap, kebabCase } from "lodash"

export default function (importedSku: ImportedSku): MarshalledSku {
  return omitNullish<MarshalledSku>({
    id: importedSku["SKU"],
    name: importedSku["Name"],
    description: importedSku["Description"],
    productId: importedSku["Group SKU"],
    price: fromDecimalString(importedSku["Price"], CurrencyCode.USD)!,
    inventory: parseInventory(importedSku["Inventory"] as InventoryShorthand),
    netWeight: weightFromString(importedSku["Net weight"])!,
    isDefaultSku: parseCsvBoolean(importedSku["Is group default"]),
    isAvailableForPreorder: parseCsvBoolean(
      importedSku["Is available for preorder"],
    ),
    costOfGoodsSold: fromDecimalString(importedSku["COGS"], CurrencyCode.USD),
    unitPricingBaseMeasure: weightFromString(
      importedSku["Unit pricing base measure"],
    ),
    gtin: importedSku["GTIN"] || undefined,
    mpn: importedSku["MPN"] || undefined,
    isAdult: parseCsvBoolean(importedSku["Is adult product"]),
    multipackQuantity: parseCsvNumber(importedSku["Multipack quantity"]),
    isBundle: parseCsvBoolean(importedSku["Is bundle"]),
    shippingLabel: importedSku[
      "Shipping label"
    ] as MarshalledSku["shippingLabel"],
    maxHandlingTime: durationFromString(importedSku["Max handling time"]),
    minHandlingTime: durationFromString(importedSku["Min handling time"]),
    attributeValues: Object.keys(importedSku)
      .filter((key) => key.trim().match(/^Attribute: /))
      .map((key) => [key, importedSku[key]])
      .reduce((attributeValues, [key, value]) => {
        const attributeId = kebabCase(key.replace(/Attribute: /gi, "").trim())
        attributeValues[attributeId] = kebabCase(value)
        return attributeValues
      }, {} as MarshalledSkuAttributeValues),
    taxonomyTerms: flatMap(
      Object.keys(importedSku)
        .filter((key) => key.trim().match(/^Taxonomy/))
        .map((key) => importedSku[key].split(",")),
    ).map(kebabCase),
  })
}

function parseInventory(inventoryShorthand: InventoryShorthand): Inventory {
  const inventoryShorthandAsNumber = parseInt(`${inventoryShorthand}`, 10)
  if (typeof inventoryShorthandAsNumber === "number") {
    return {
      type: "finite",
      quantity: inventoryShorthandAsNumber,
      quantityReserved: 0,
    }
  }
  if (inventoryShorthand === "infinite") {
    return { type: "infinite" }
  }
  if (
    typeof inventoryShorthand === "string" &&
    inventoryShorthand.trim().match(/in_stock|limited|out_of_stock/)
  ) {
    return { type: "bucket", bucket: inventoryShorthand }
  }
  throw new InvalidInputError(
    `The inventory shorthand provided was invalid: ${inventoryShorthand}`,
  )
}
