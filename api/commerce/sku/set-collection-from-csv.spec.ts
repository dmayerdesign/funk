import { SetMany } from "@funk/api/plugins/persistence/actions/set-many"
import { construct, SetCollectionFromCsv } from "@funk/api/commerce/sku/set-collection-from-csv"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"
import { keys, values } from "lodash"

describe("setCollectionFromCsv", () =>
{
  const FAKE_SKU = createFakeMarshalledSku()
  const CSV_EMPTY = [keys(FAKE_SKU).join(",")].join("\n") + "\n"
  const CSV_WITH_1_FAKE_SKU = [
    keys(FAKE_SKU).join(","),
    values(FAKE_SKU).join(","),
  ].join("\n") + "\n"

  let setMany: SetMany
  let setCollectionFromCsv: SetCollectionFromCsv

  it("should do nothing with an empty csv", async () =>
  {
    await setCollectionFromCsv(CSV_EMPTY)

    expect(setMany).not.toHaveBeenCalled()
  })

  it("should process a valid csv", async () =>
  {
    await setCollectionFromCsv(CSV_WITH_1_FAKE_SKU)

    expect(setMany).toHaveBeenCalled()
  })

  it("should ignore unknown fields", async () =>
  {
  })

  beforeEach(() =>
  {
    setMany = jest.fn()
    setCollectionFromCsv = construct(setMany)
  })
})
