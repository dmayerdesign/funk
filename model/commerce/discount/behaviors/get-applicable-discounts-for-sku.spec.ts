import getApplicableDiscountsForSku from "@funk/model/commerce/discount/behaviors/get-applicable-discounts-for-sku"
import { SkuDiscount } from "@funk/model/commerce/discount/discount"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"
import { CurrencyCode } from "@funk/model/money/currency-code"
import { createFakeSkuDiscount } from "../stubs"

describe("getApplicableDiscountsForSku", () => {
  it("should not filter out all-inclusive discounts", () => {
    const ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT = createAllInclusiveTenPercentDiscount(
      {
        isCompoundable: true,
      },
    )
    const FAKE_MARSHALLED_SKU = createFakeMarshalledSku()
    const FAKE_MARSHALLED_PRODUCT = createMarshalledProduct()
    const originalDiscounts = [
      ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT,
      ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT,
    ]

    const applicableDiscounts = getApplicableDiscountsForSku(
      originalDiscounts,
      { sku: FAKE_MARSHALLED_SKU, product: FAKE_MARSHALLED_PRODUCT },
    )

    expect(applicableDiscounts).toEqual(originalDiscounts)
  })
  it("should only allow one non-compoundable discount", () => {
    const ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT = createAllInclusiveTenPercentDiscount(
      {
        isCompoundable: false,
      },
    )
    const FAKE_MARSHALLED_SKU = createFakeMarshalledSku()
    const FAKE_MARSHALLED_PRODUCT = createMarshalledProduct()

    const originalDiscounts = [
      ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT,
      ALL_INCLUSIVE_TEN_PERCENT_DISCOUNT,
    ]
    expect(
      getApplicableDiscountsForSku(originalDiscounts, {
        sku: FAKE_MARSHALLED_SKU,
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
    const FAKE_MARSHALLED_PRODUCT = createMarshalledProduct()

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
    const FAKE_MARSHALLED_SKU = createFakeMarshalledSku()
    const PRODUCT_EXCLUDED_BY_ID = createProductExcludedById()

    const originalDiscounts = [EXCLUSIVE_AMOUNT_DISCOUNT]
    expect(
      getApplicableDiscountsForSku(originalDiscounts, {
        sku: FAKE_MARSHALLED_SKU,
        product: PRODUCT_EXCLUDED_BY_ID,
      }),
    ).toEqual([])
  })
  it("should filter out discounts which exclude the SKU by taxonomy term", () => {
    const EXCLUSIVE_AMOUNT_DISCOUNT = createExclusiveAmountDiscount({})
    const FAKE_MARSHALLED_PRODUCT = createMarshalledProduct()
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
    const FAKE_MARSHALLED_SKU = createFakeMarshalledSku()
    const PRODUCT_EXCLUDED_BY_TAX_TERM = createProductExcludedByTaxTerm()
    const originalDiscounts = [EXCLUSIVE_AMOUNT_DISCOUNT]
    expect(
      getApplicableDiscountsForSku(originalDiscounts, {
        sku: FAKE_MARSHALLED_SKU,
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
    taxonomyTerms: [`tax term id ${idSuffix}`],
  } as MarshalledSku)
export const createSkuExcludedByTaxTerm = (idSuffix = "0") =>
  ({
    id: `test sku id ${idSuffix}`,
    productId: `test product id ${idSuffix}`,
    price: { amount: 1000, currency: "USD" },
    taxonomyTerms: ["tax term id EXCLUDE_FROM_DISCOUNT"],
  } as MarshalledSku)
export const createMarshalledProduct = (idSuffix = "0") =>
  ({
    id: `test product id ${idSuffix}`,
    taxonomyTerms: [`tax term id ${idSuffix}`],
  } as MarshalledProduct)
export const createProductExcludedById = (idSuffix = "0") =>
  ({
    id: "test product id EXCLUDE_FROM_DISCOUNT",
    taxonomyTerms: [`tax term id ${idSuffix}`],
  } as MarshalledProduct)
export const createProductExcludedByTaxTerm = (idSuffix = "0") =>
  ({
    id: `test product id ${idSuffix}`,
    taxonomyTerms: ["tax term id EXCLUDE_FROM_DISCOUNT"],
  } as MarshalledProduct)
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
