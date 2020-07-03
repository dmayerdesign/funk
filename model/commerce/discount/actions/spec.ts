import getApplicableDiscountsForSku from
  "@funk/model/commerce/discount/actions/get-applicable-discounts-for-sku"
import { SkuDiscount } from "@funk/model/commerce/discount/discount"
import { CurrencyCode } from "@funk/model/money/currency-code"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"

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

export const DISCOUNT_START_DATE = Date.now() - 60000000
export const DISCOUNT_END_DATE = Date.now() + 60000000
export const createSkuExcludedById = (idSuffix = "0") => ({
  id: "test_sku_id_EXCLUDE_FROM_DISCOUNT",
  productId: `test_product_id_${idSuffix}`,
  price: { amount: 1000, currency: "USD" },
  taxonomyTerms: [ `tax_term_id_${idSuffix}` ],
}) as MarshalledSku
export const createSkuExcludedByTaxTerm = (idSuffix = "0") => ({
  id: `test_sku_id_${idSuffix}`,
  productId: `test_product_id_${idSuffix}`,
  price: { amount: 1000, currency: "USD" },
  taxonomyTerms: [ "tax_term_id_EXCLUDE_FROM_DISCOUNT" ],
}) as MarshalledSku
export const createMarshalledProduct = (idSuffix = "0") => ({
  id: `test_product_id_${idSuffix}`,
  taxonomyTerms: [ `tax_term_id_${idSuffix}` ],
}) as MarshalledProduct
export const createProductExcludedById = (idSuffix = "0") => ({
  id: "test_product_id_EXCLUDE_FROM_DISCOUNT",
  taxonomyTerms: [ `tax_term_id_${idSuffix}` ],
}) as MarshalledProduct
export const createProductExcludedByTaxTerm = (idSuffix = "0") => ({
  id: `test_product_id_${idSuffix}`,
  taxonomyTerms: [ "tax_term_id_EXCLUDE_FROM_DISCOUNT" ],
}) as MarshalledProduct
export function createAllInclusiveTenPercentDiscount({
  isCompoundable = false,
}: {
  isCompoundable?: boolean
}): SkuDiscount
{
  return {
    id: "test-discount-percentage",
    type: "sku",
    percentage: 10,
    includes: { all: true },
    startAt: DISCOUNT_START_DATE,
    endAt: DISCOUNT_END_DATE,
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
    id: "test-discount-amount",
    type: "sku",
    total: { amount: 1000, currency: CurrencyCode.USD },
    includes: {
      skus: [
        "test_sku_id_2",
        "test_sku_id_4",
        "test_sku_id_EXCLUDE_FROM_DISCOUNT",
      ],
      taxonomyTerms: [
        "tax_term_id_1",
        "tax_term_id_2",
        "tax_term_id_3",
      ],
    },
    excludes: {
      skus: [
        "test_sku_id_EXCLUDE_FROM_DISCOUNT",
      ],
      taxonomyTerms: [
        "tax_term_id_EXCLUDE_FROM_DISCOUNT",
      ],
    },
    startAt: DISCOUNT_START_DATE,
    endAt: DISCOUNT_END_DATE,
    isCompoundable,
  }
}

