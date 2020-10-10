import getTotalBeforeTaxAndShippingImpl from "@funk/api/commerce/order/get-total-before-tax-and-shipping"
import getByIdImpl from "@funk/api/plugins/persistence/behaviors/get-by-id"
import populateImpl from "@funk/api/plugins/persistence/behaviors/populate"
import getSalesTaxRateForAddressImpl from "@funk/api/plugins/tax/behaviors/get-sales-tax-rate-for-address"
import { ORDER_GET_TAX_MISSING_POSTAL_CODE } from "@funk/copy/error-messages"
import throwInvalidInputIfNilOrEmpty from "@funk/helpers/throw-invalid-input-if-nil-or-empty"
import { Address } from "@funk/model/address/address"
import { DISCOUNTS } from "@funk/model/commerce/discount/discount"
import { Enterprise } from "@funk/model/commerce/enterprise/enterprise"
import getShipmentAddress from "@funk/model/commerce/order/behaviors/get-shipment-address"
import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import { SKUS } from "@funk/model/commerce/sku/sku"
import add from "@funk/model/money/behaviors/add"
import { ORGANIZATIONS } from "@funk/model/organization/organization"

export function construct(
  getTotalBeforeTaxAndShipping: typeof getTotalBeforeTaxAndShippingImpl,
  populate: typeof populateImpl,
  getSalesTaxRateForAddress: typeof getSalesTaxRateForAddressImpl,
  getById: typeof getByIdImpl
) {
  return async function (order: Order | MarshalledOrder): Promise<Price> {
    const populatedOrder = await populate<Order, MarshalledOrder>(
      order as MarshalledOrder,
      [
        { key: "skus", collectionPath: SKUS },
        { key: "discounts", collectionPath: DISCOUNTS },
      ]
    )

    const primaryEnterprise = await getById<Enterprise>(
      ORGANIZATIONS,
      "primary"
    )
    const shipmentAddress = throwInvalidInputIfNilOrEmpty(
      getShipmentAddress(populatedOrder),
      ORDER_GET_TAX_MISSING_POSTAL_CODE
    )
    const orderTotalBeforeTax = await getTotalBeforeTaxAndShipping(
      populatedOrder
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
      }
    )
  }

  async function getTaxRate(
    primaryEnterprise: Enterprise,
    shipmentAddress: Address
  ) {
    return primaryEnterprise?.salesTaxNexusStates?.includes(
      shipmentAddress.state
    )
      ? await getSalesTaxRateForAddress(shipmentAddress)
      : 0
  }
}

export default construct(
  getTotalBeforeTaxAndShippingImpl,
  populateImpl,
  getSalesTaxRateForAddressImpl,
  getByIdImpl
)

export type GetTax = ReturnType<typeof construct>
