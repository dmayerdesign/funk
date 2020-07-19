import { SetMany } from "@funk/api/plugins/persistence/actions/set-many"
import { construct, SetCollectionFromCsv } from "@funk/api/commerce/sku/set-collection-from-csv"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { keys, values } from "lodash"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"

describe("setCollectionFromCsv", () =>
{
  const FAKE_SKU = createFakeMarshalledSku()
  const FAKE_INVALID_SKU = {
    ...createFakeMarshalledSku(),
    price: undefined,
  } as Partial<MarshalledSku>
  const CSV_EMPTY = [keys(FAKE_SKU).join(",")].join("\n") + "\n"
  const CSV_WITH_1_FAKE_SKU = [
    keys(FAKE_SKU).join(","),
    values(FAKE_SKU).join(","),
  ].join("\n") + "\n"
  const CSV_WITH_1_INVALID_SKU = [
    keys(FAKE_SKU).join(","),
    values(FAKE_INVALID_SKU).join(","),
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

  it("should fail on an invalid csv", async () =>
  {
    let error
    try
    {
      await setCollectionFromCsv(CSV_WITH_1_INVALID_SKU)
    }
    catch (_error)
    {
      error = _error
    }
    expect(error).toBeTruthy()
    expect(error instanceof InvalidInputError)
    expect(setMany).not.toHaveBeenCalled()
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
