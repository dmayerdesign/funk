import getApplicableDiscountsForSku from "@funk/commerce/discount/model/behaviors/get-applicable-discounts-for-sku"
import { SkuDiscount } from "@funk/commerce/discount/model/discount"
import { Product } from "@funk/commerce/product/model/product"
import { Sku } from "@funk/commerce/sku/model/sku"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"
import { createFakeTaxonomyTerm } from "@funk/commerce/taxonomy/model/stubs"
import { CurrencyCode } from "@funk/money/model/currency-code"
import { createFakeSkuDiscount } from "../stubs"

describe("getApplicableDiscountsForSku", () => {
  it("should not filter out all-inclusive discounts", () => {
    const ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT = createAllInclusiveTenPercentDiscount(
      {
        isCompoundable: true,
      },
    )
    const FAKE_SKU = createFakeSku()
    const FAKE_MARSHALLED_PRODUCT = createProduct()
    const originalDiscounts = [
      ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT,
      ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT,
    ]

    const applicableDiscounts = getApplicableDiscountsForSku(
      originalDiscounts,
      { sku: FAKE_SKU, product: FAKE_MARSHALLED_PRODUCT },
    )

    expect(applicableDiscounts).toEqual(originalDiscounts)
  })
  it("should only allow one non-compoundable discount", () => {
    const ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT = createAllInclusiveTenPercentDiscount(
      {
        isCompoundable: false,
      },
    )
    const FAKE_SKU = createFakeSku()
    const FAKE_MARSHALLED_PRODUCT = createProduct()

    const originalDiscounts = [
      ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT,
      ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT,
    ]
    expect(
      getApplicableDiscountsForSku(originalDiscounts, {
        sku: FAKE_SKU,
        product: FAKE_MARSHALLED_PRODUCT,
      }),
    ).toEqual([ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT])
  })
  it("should filter out discounts which exclude the SKU by id", () => {
    const ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT = createAllInclusiveTenPercentDiscount(
      {
        isCompoundable: true,
      },
    )
    const EXCLUSIVE_AMOUNT_DISCOUNT = createExclusiveAmountDiscount({
      isCompoundable: true,
    })
    const SKU_EXCLUDED_BY_ID = createSkuExcludedById()
    const FAKE_MARSHALLED_PRODUCT = createProduct()

    const originalDiscounts = [
      ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT,
      EXCLUSIVE_AMOUNT_DISCOUNT,
    ]
    expect(
      getApplicableDiscountsForSku(originalDiscounts, {
        sku: SKU_EXCLUDED_BY_ID,
        product: FAKE_MARSHALLED_PRODUCT,
      }),
    ).toEqual([ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT])
  })
  it("should filter out discounts which exclude the product by id", () => {
    const EXCLUSIVE_AMOUNT_DISCOUNT = createExclusiveAmountDiscount({})
    const FAKE_SKU = createFakeSku()
    const PRODUCT_EXCLUDED_BY_ID = createProductExcludedById()

    const originalDiscounts = [EXCLUSIVE_AMOUNT_DISCOUNT]
    expect(
      getApplicableDiscountsForSku(originalDiscounts, {
        sku: FAKE_SKU,
        product: PRODUCT_EXCLUDED_BY_ID,
      }),
    ).toEqual([])
  })
  it("should filter out discounts which exclude the SKU by taxonomy term", () => {
    const EXCLUSIVE_AMOUNT_DISCOUNT = createExclusiveAmountDiscount({})
    const FAKE_MARSHALLED_PRODUCT = createProduct()
    const SKU_EXCLUDED_BY_TAX_TERM = createSkuExcludedByTaxTerm()

    const originalDiscounts = [EXCLUSIVE_AMOUNT_DISCOUNT]
    expect(
      getApplicableDiscountsForSku(originalDiscounts, {
        sku: SKU_EXCLUDED_BY_TAX_TERM,
        product: FAKE_MARSHALLED_PRODUCT,
      }),
    ).toEqual([])
  })
  it("should filter out discounts which exclude the product by taxonomy term", () => {
    const EXCLUSIVE_AMOUNT_DISCOUNT = createExclusiveAmountDiscount({})
    const FAKE_SKU = createFakeSku()
    const PRODUCT_EXCLUDED_BY_TAX_TERM = createProductExcludedByTaxTerm()
    const originalDiscounts = [EXCLUSIVE_AMOUNT_DISCOUNT]
    expect(
      getApplicableDiscountsForSku(originalDiscounts, {
        sku: FAKE_SKU,
        product: PRODUCT_EXCLUDED_BY_TAX_TERM,
      }),
    ).toEqual([])
  })
})

export const createSkuExcludedById = (idSuffix = "0") =>
  ({
    id: "test sku id EXCLUDE_FROM_DISCOUNT",
    productId: `test product id ${idSuffix}`,
    price: { amount: 1000, currency: "USD" },
    taxonomyTerms: [createFakeTaxonomyTerm({ id: `tax term id ${idSuffix}` })],
  } as Sku)
export const createSkuExcludedByTaxTerm = (idSuffix = "0") =>
  ({
    id: `test sku id ${idSuffix}`,
    productId: `test product id ${idSuffix}`,
    price: { amount: 1000, currency: "USD" },
    // taxonomyTerms: ["tax term id EXCLUDE_FROM_DISCOUNT"],
  } as Sku)
export const createProduct = (idSuffix = "0") =>
  ({
    id: `test product id ${idSuffix}`,
    taxonomyTerms: [createFakeTaxonomyTerm({ id: `tax term id ${idSuffix}` })],
  } as Product)
export const createProductExcludedById = (idSuffix = "0") =>
  ({
    id: "test product id EXCLUDE_FROM_DISCOUNT",
    taxonomyTerms: [createFakeTaxonomyTerm({ id: `tax term id ${idSuffix}` })],
  } as Product)
export const createProductExcludedByTaxTerm = (idSuffix = "0") =>
  ({
    id: `test product id ${idSuffix}`,
    taxonomyTerms: [
      createFakeTaxonomyTerm({ id: "tax term id EXCLUDE_FROM_DISCOUNT" }),
    ],
  } as Product)
export function createAllInclusiveTenPercentDiscount({
  isCompoundable = false,
}: {
  isCompoundable?: boolean
}): SkuDiscount {
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
}): SkuDiscount {
  return {
    ...createFakeSkuDiscount("test discount amount"),
    total: { amount: 1000, currency: CurrencyCode.USD },
    includes: {
      skus: [
        "test sku id 2",
        "test sku id 4",
        "test sku id EXCLUDE_FROM_DISCOUNT",
      ],
      taxonomyTerms: ["tax term id 1", "tax term id 2", "tax term id 3"],
    },
    excludes: {
      skus: ["test sku id EXCLUDE_FROM_DISCOUNT"],
      taxonomyTerms: ["tax term id EXCLUDE_FROM_DISCOUNT"],
    },
    isCompoundable,
  }
}
