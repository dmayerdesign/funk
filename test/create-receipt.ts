import { Order } from "@funk/commerce/order/domain/order"
import { DbDocumentInput } from "@funk/persistence/domain/database-document"
import { readFileSync } from "fs-extra"
import { compile } from "handlebars"
import { resolve } from "path"

export function construct() {
  return function (partialOrder: Partial<DbDocumentInput<Order>>): string {
    const runtimePathToTemplate = resolve(
      __dirname,
      "../../",
      "assets/email-templates",
      "receipt.hbs",
    )
    const template = compile(
      readFileSync(runtimePathToTemplate).toString("utf8"),
    )
    return template({ skus: partialOrder.skus })
  }
}

export default construct()

export type CreateReceipt = ReturnType<typeof construct>
