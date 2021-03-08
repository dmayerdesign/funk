import { Enterprise } from "@funk/commerce/enterprise/model/enterprise"
import getTotalBeforeTaxAndShippingImpl from "@funk/commerce/order/application/internal/behaviors/get-total-before-tax-and-shipping"
import getShipmentAddress from "@funk/commerce/order/model/behaviors/get-shipment-address"
import { Order } from "@funk/commerce/order/model/order"
import getSalesTaxRateForAddressImpl from "@funk/commerce/plugins/internal/tax/behaviors/get-sales-tax-rate-for-address"
import { NULL_PRICE, Price } from "@funk/commerce/price/model/price"
import throwInvalidInputIfNilOrEmpty from "@funk/helpers/throw-invalid-input-if-nil-or-empty"
import add from "@funk/money/model/behaviors/add"
import getPrimaryOrganizationImpl from "@funk/organization/application/internal/behaviors/persistence/get-primary-organization"
import { Address } from "@funk/places/model/address"
import { ORDER_GET_TAX_MISSING_POSTAL_CODE } from "@funk/ui/copy/error-messages"

export function construct(
  getTotalBeforeTaxAndShipping: typeof getTotalBeforeTaxAndShippingImpl,
  getSalesTaxRateForAddress: typeof getSalesTaxRateForAddressImpl,
  getPrimaryOrganization: typeof getPrimaryOrganizationImpl,
) {
  return async function (order: Order): Promise<Price> {
    const primaryEnterprise = await getPrimaryOrganization()
    const shipmentAddress = throwInvalidInputIfNilOrEmpty(
      getShipmentAddress(order),
      ORDER_GET_TAX_MISSING_POSTAL_CODE,
    )
    const orderTotalBeforeTax = await getTotalBeforeTaxAndShipping(order)
    const taxRate = await getTaxRate(
      primaryEnterprise! as Enterprise,
      shipmentAddress,
    )

    return add(
      {
        amount: Math.ceil(orderTotalBeforeTax.amount * taxRate),
        currency: orderTotalBeforeTax.currency,
      },
      order.additionalTaxAmount ?? {
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
  getSalesTaxRateForAddressImpl,
  getPrimaryOrganizationImpl,
)

export type GetTax = ReturnType<typeof construct>
