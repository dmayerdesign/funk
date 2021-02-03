import { Dictionary } from "lodash"

export interface ImportedSku extends Dictionary<string> {
  Thumbnail: string
  SKU: string
  Name: string
  Description: string
  "Group SKU": string
  Price: string
  Inventory: string
  "Net weight": string
  "Is group default": string
  "Is available for preorder": string
  COGS: string
  "Unit pricing base measure": string
  GTIN: string
  MPN: string
  "Is adult product": string
  "Multipack quantity": string
  "Is bundle": string
  "Shipping label": string
  "Max handling time": string
  "Min handling time": string
}
