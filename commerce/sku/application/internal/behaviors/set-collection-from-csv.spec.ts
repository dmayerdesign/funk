import { SetMany as SetManySkus } from "@funk/commerce/sku/application/internal/behaviors/persistence/set-many"
import {
  construct,
  SetCollectionFromCsv,
} from "@funk/commerce/sku/application/internal/behaviors/set-collection-from-csv"
import { FiniteInventory } from "@funk/commerce/sku/model/inventory"
import { Sku } from "@funk/commerce/sku/model/sku"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import { keys, values } from "lodash"
import marshall from "./persistence/marshall"

describe("setCollectionFromCsv", () => {
  const FAKE_MARSHALLED_SKU = ({
    ...marshall(createFakeSku()),
    attributeValues: ["attribute-value-for-sku-id"],
    taxonomyTerms: ["taxonomy-term-for-sku-id"],
  } as unknown) as Sku

  const FAKE_IMPORTED_SKU = {
    SKU: FAKE_MARSHALLED_SKU.id,
    Name: FAKE_MARSHALLED_SKU.name,
    "Group SKU": FAKE_MARSHALLED_SKU.productId,
    Price: `$${(FAKE_MARSHALLED_SKU.price.amount / 100).toFixed(2)}`,
    Inventory: (FAKE_MARSHALLED_SKU.inventory as FiniteInventory).quantity,
    "Net weight":
      FAKE_MARSHALLED_SKU.netWeight.amount.toString() +
      FAKE_MARSHALLED_SKU.netWeight.unit,
    ["Taxonomy: taxonomy for " + FAKE_MARSHALLED_SKU.id]:
      "taxonomy term for " + FAKE_MARSHALLED_SKU.id,
    ["Attribute: attribute for " + FAKE_MARSHALLED_SKU.id]:
      "attribute value for " + FAKE_MARSHALLED_SKU.id,
  }
  const FAKE_IMPORTED_SKU_INVALID = {
    ...FAKE_IMPORTED_SKU,
    Price: "",
  }
  const CSV_EMPTY = [keys(FAKE_IMPORTED_SKU).join(",")].join("\n") + "\n"
  const CSV_WITH_1_FAKE_SKU =
    [
      keys(FAKE_IMPORTED_SKU).join(","),
      values(FAKE_IMPORTED_SKU).join(","),
    ].join("\n") + "\n"
  const CSV_WITH_1_FAKE_SKU_EXTRA_FIELDS =
    [
      keys(FAKE_IMPORTED_SKU).join(","),
      values({ ...FAKE_IMPORTED_SKU, Foo: "bar", Baz: "1" }).join(","),
    ].join("\n") + "\n"
  const CSV_WITH_1_INVALID_SKU =
    [
      keys(FAKE_IMPORTED_SKU).join(","),
      values(FAKE_IMPORTED_SKU_INVALID).join(","),
    ].join("\n") + "\n"

  let setManySkus: SetManySkus
  let setCollectionFromCsv: SetCollectionFromCsv

  beforeEach(() => {
    setManySkus = jest.fn()
    setCollectionFromCsv = construct(setManySkus)
  })

  it("should do nothing with an empty csv", async () => {
    await setCollectionFromCsv(CSV_EMPTY)

    expect(setManySkus).not.toHaveBeenCalled()
  })

  it("should process a valid csv", async () => {
    await setCollectionFromCsv(CSV_WITH_1_FAKE_SKU)

    expect(setManySkus).toHaveBeenCalledWith({
      [FAKE_MARSHALLED_SKU.id]: FAKE_MARSHALLED_SKU,
    })
  })

  it("should fail on an invalid csv", async () => {
    let error
    try {
      await setCollectionFromCsv(CSV_WITH_1_INVALID_SKU)
    } catch (_error) {
      error = _error
    }
    expect(error).toBeTruthy()
    expect(error instanceof InvalidInputError)
    expect(setManySkus).not.toHaveBeenCalled()
  })

  it("should ignore unknown fields", async () => {
    await setCollectionFromCsv(CSV_WITH_1_FAKE_SKU_EXTRA_FIELDS)

    expect(setManySkus).toHaveBeenCalledWith({
      [FAKE_MARSHALLED_SKU.id]: FAKE_MARSHALLED_SKU,
    })
  })
})
