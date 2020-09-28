import getApplicableDiscountsForSku from "@funk/model/commerce/discount/behaviors/get-applicable-discounts-for-sku"
import { SkuDiscount } from "@funk/model/commerce/discount/discount"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"
import { CurrencyCode } from "@funk/model/money/currency-code"
import { createFakeSkuDiscount } from "../stubs"

describe("getApplicableDiscountsForSku", () =>
{
  it("should not filter out all-inclusive discounts", () =>
  {
    const originalDiscounts = [
      createAllInclusiveTenPercentDiscount({ isCompoundable: true }),
      createAllInclusiveTenPercentDiscount({ isCompoundable: true }),
    ]
    expect(
      getApplicableDiscountsForSku(
        originalDiscounts,
        { sku: createFakeMarshalledSku(), product: createMarshalledProduct() }
      ))
      .toEqual(originalDiscounts)
  })
  it("should only allow one non-compoundable discount", () =>
  {
    const originalDiscounts = [
      createAllInclusiveTenPercentDiscount({ isCompoundable: false }),
      createAllInclusiveTenPercentDiscount({ isCompoundable: false }),
    ]
    expect(
      getApplicableDiscountsForSku(
        originalDiscounts,
        { sku: createFakeMarshalledSku(), product: createMarshalledProduct() }
      ))
      .toEqual([
        createAllInclusiveTenPercentDiscount({ isCompoundable: false }),
      ])
  })
  it("should filter out discounts which exclude the SKU by id", () =>
  {
    const originalDiscounts = [
      createAllInclusiveTenPercentDiscount({ isCompoundable: true }),
      createExclusiveAmountDiscount({ isCompoundable: true }),
    ]
    expect(
      getApplicableDiscountsForSku(
        originalDiscounts,
        { sku: createSkuExcludedById(), product: createMarshalledProduct() }
      ))
      .toEqual([
        createAllInclusiveTenPercentDiscount({ isCompoundable: true }),
      ])
  })
  it("should filter out discounts which exclude the product by id", () =>
  {
    const originalDiscounts = [
      createExclusiveAmountDiscount({}),
    ]
    expect(
      getApplicableDiscountsForSku(
        originalDiscounts,
        { sku: createFakeMarshalledSku(), product: createProductExcludedById() }
      ))
      .toEqual([])
  })
  it("should filter out discounts which exclude the SKU by taxonomy term", () =>
  {
    const originalDiscounts = [
      createExclusiveAmountDiscount({}),
    ]
    expect(
      getApplicableDiscountsForSku(
        originalDiscounts,
        { sku: createSkuExcludedByTaxTerm(), product: createMarshalledProduct() }
      ))
      .toEqual([])
  })
  it("should filter out discounts which exclude the product by taxonomy term", () =>
  {
    const originalDiscounts = [
      createExclusiveAmountDiscount({}),
    ]
    expect(
      getApplicableDiscountsForSku(
        originalDiscounts,
        { sku: createFakeMarshalledSku(), product: createProductExcludedByTaxTerm() }
      ))
      .toEqual([])
  })
})

export const createSkuExcludedById = (idSuffix = "0") => ({
  id: "test sku id EXCLUDE_FROM_DISCOUNT",
  productId: `test product id ${idSuffix}`,
  price: { amount: 1000, currency: "USD" },
  taxonomyTerms: [ `tax term id ${idSuffix}` ],
}) as MarshalledSku
export const createSkuExcludedByTaxTerm = (idSuffix = "0") => ({
  id: `test sku id ${idSuffix}`,
  productId: `test product id ${idSuffix}`,
  price: { amount: 1000, currency: "USD" },
  taxonomyTerms: [ "tax term id EXCLUDE_FROM_DISCOUNT" ],
}) as MarshalledSku
export const createMarshalledProduct = (idSuffix = "0") => ({
  id: `test product id ${idSuffix}`,
  taxonomyTerms: [ `tax term id ${idSuffix}` ],
}) as MarshalledProduct
export const createProductExcludedById = (idSuffix = "0") => ({
  id: "test product id EXCLUDE_FROM_DISCOUNT",
  taxonomyTerms: [ `tax term id ${idSuffix}` ],
}) as MarshalledProduct
export const createProductExcludedByTaxTerm = (idSuffix = "0") => ({
  id: `test product id ${idSuffix}`,
  taxonomyTerms: [ "tax term id EXCLUDE_FROM_DISCOUNT" ],
}) as MarshalledProduct
export function createAllInclusiveTenPercentDiscount({
  isCompoundable = false,
}: {
  isCompoundable?: boolean
}): SkuDiscount
{
  return {
    ...createFakeSkuDiscount("test discount percentage"),
    percentage: 10,
    includes: { all: true },
    isCompoundable,
  }
}
export function createExclusiveAmountDiscount({
  isCompoundable = false,
}: {
  isCompoundable?: boolean
}): SkuDiscount
{
  return {
    ...createFakeSkuDiscount("test discount amount"),
    total: { amount: 1000, currency: CurrencyCode.USD },
    includes: {
      skus: [
        "test sku id 2",
        "test sku id 4",
        "test sku id EXCLUDE_FROM_DISCOUNT",
      ],
      taxonomyTerms: [
        "tax term id 1",
        "tax term id 2",
        "tax term id 3",
      ],
    },
    excludes: {
      skus: [
        "test sku id EXCLUDE_FROM_DISCOUNT",
      ],
      taxonomyTerms: [
        "tax term id EXCLUDE_FROM_DISCOUNT",
      ],
    },
    isCompoundable,
  }
}

