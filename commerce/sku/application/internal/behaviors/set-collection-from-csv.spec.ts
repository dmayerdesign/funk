import {
    construct,
    SetCollectionFromCsv
} from "@funk/commerce/sku/application/internal/behaviors/set-collection-from-csv"
import { FiniteInventory } from "@funk/commerce/sku/model/inventory"
import { MarshalledSku, SKUS } from "@funk/commerce/sku/model/sku"
import { createFakeMarshalledSku } from "@funk/commerce/sku/model/stubs"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import { SetMany } from "@funk/persistence/application/internal/behaviors/set-many"
import { keys, startCase, values } from "lodash"

describe("setCollectionFromCsv", () => {
  const FAKE_SKU = createFakeMarshalledSku()
  const FAKE_IMPORTED_SKU = {
    SKU: FAKE_SKU.id,
    Name: FAKE_SKU.name,
    "Group SKU": FAKE_SKU.productId,
    Price: `$${(FAKE_SKU.price.amount / 100).toFixed(2)}`,
    Inventory: (FAKE_SKU.inventory as FiniteInventory).quantity,
    "Net weight":
      FAKE_SKU.netWeight.amount.toString() + FAKE_SKU.netWeight.unit,
    Taxonomy: FAKE_SKU.taxonomyTerms?.map(startCase).join(","),
    ["Attribute: attribute for " + FAKE_SKU.id]:
      "attribute value for " + FAKE_SKU.id,
  }
  const FAKE_IMPORTED_SKU_INVALID = {
    ...createFakeMarshalledSku(),
    Price: "",
  } as Partial<MarshalledSku>
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

  let setMany: SetMany
  let setCollectionFromCsv: SetCollectionFromCsv

  it("should do nothing with an empty csv", async () => {
    await setCollectionFromCsv(CSV_EMPTY)

    expect(setMany).not.toHaveBeenCalled()
  })

  it("should process a valid csv", async () => {
    await setCollectionFromCsv(CSV_WITH_1_FAKE_SKU)

    expect(setMany).toHaveBeenCalledWith({
      [SKUS]: {
        [FAKE_SKU.id]: FAKE_SKU,
      },
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
    expect(setMany).not.toHaveBeenCalled()
  })

  it("should ignore unknown fields", async () => {
    await setCollectionFromCsv(CSV_WITH_1_FAKE_SKU_EXTRA_FIELDS)

    expect(setMany).toHaveBeenCalledWith({
      [SKUS]: {
        [FAKE_SKU.id]: FAKE_SKU,
      },
    })
  })

  beforeEach(() => {
    setMany = jest.fn()
    setCollectionFromCsv = construct(setMany)
  })
})
