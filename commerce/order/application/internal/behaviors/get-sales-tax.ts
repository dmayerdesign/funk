import { DISCOUNTS } from "@funk/commerce/discount/domain/discount"
import { Enterprise } from "@funk/commerce/enterprise/domain/enterprise"
import getTotalBeforeTaxAndShippingImpl from "@funk/commerce/order/application/internal/behaviors/get-total-before-tax-and-shipping"
import getShipmentAddress from "@funk/commerce/order/domain/behaviors/get-shipment-address"
import { MarshalledOrder, Order } from "@funk/commerce/order/domain/order"
import getSalesTaxRateForAddressImpl from "@funk/commerce/plugins/internal/tax/behaviors/get-sales-tax-rate-for-address"
import { NULL_PRICE, Price } from "@funk/commerce/price/domain/price"
import { SKUS } from "@funk/commerce/sku/domain/sku"
import throwInvalidInputIfNilOrEmpty from "@funk/helpers/throw-invalid-input-if-nil-or-empty"
import add from "@funk/money/domain/behaviors/add"
import { ORGANIZATIONS } from "@funk/organization/domain/organization"
import getByIdImpl from "@funk/persistence/application/internal/behaviors/get-by-id"
import populateImpl from "@funk/persistence/application/internal/behaviors/populate"
import { Address } from "@funk/places/domain/address"
import { ORDER_GET_TAX_MISSING_POSTAL_CODE } from "@funk/ui/copy/error-messages"

export function construct(
  getTotalBeforeTaxAndShipping: typeof getTotalBeforeTaxAndShippingImpl,
  populate: typeof populateImpl,
  getSalesTaxRateForAddress: typeof getSalesTaxRateForAddressImpl,
  getById: typeof getByIdImpl,
) {
  return async function (order: Order | MarshalledOrder): Promise<Price> {
    const populatedOrder = await populate<Order, MarshalledOrder>(
      order as MarshalledOrder,
      [
        { key: "skus", collectionPath: SKUS },
        { key: "discounts", collectionPath: DISCOUNTS },
      ],
    )

    const primaryEnterprise = await getById<Enterprise>(
      ORGANIZATIONS,
      "primary",
    )
    const shipmentAddress = throwInvalidInputIfNilOrEmpty(
      getShipmentAddress(populatedOrder),
      ORDER_GET_TAX_MISSING_POSTAL_CODE,
    )
    const orderTotalBeforeTax = await getTotalBeforeTaxAndShipping(
      populatedOrder,
    )
    const taxRate = await getTaxRate(primaryEnterprise!, shipmentAddress)

    return add(
      {
        amount: Math.ceil(orderTotalBeforeTax.amount * taxRate),
        currency: orderTotalBeforeTax.currency,
      },
      populatedOrder.additionalTaxAmount ?? {
        ...NULL_PRICE,
        currency: orderTotalBeforeTax.currency,
      },
    )
  }

  async function getTaxRate(
    primaryEnterprise: Enterprise,
    shipmentAddress: Address,
  ) {
    return primaryEnterprise?.salesTaxNexusStates?.includes(
      shipmentAddress.state,
    )
      ? await getSalesTaxRateForAddress(shipmentAddress)
      : 0
  }
}

export default construct(
  getTotalBeforeTaxAndShippingImpl,
  populateImpl,
  getSalesTaxRateForAddressImpl,
  getByIdImpl,
)

export type GetTax = ReturnType<typeof construct>
