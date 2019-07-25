import { Entity } from '../data-access/entity'
import { Discount } from '../discount/discount'
import { EasypostRate } from '../easypost-rate/easypost-rate'
import { OrderCustomer } from '../order-customer/order-customer'
import { Price } from '../price/price'
import { Product } from '../product/product'
import { StripeCardToken } from '../stripe-card-token/stripe-card-token'

export enum OrderStatus {
    PreSubmitInvalid = 'Invalid',
    PreSubmitValid = 'Valid',
    Pending = 'Pending',
    Paid = 'Paid',
    Shipped = 'Shipped',
    Received = 'Received',
    Cancelled = 'Cancelled',
    Refunded = 'Refunded',
    Returned = 'Returned',
}

export interface Order extends Entity {
    products: Product[]
    subTotal: Price
    total: Price
    taxPercent: number
    paymentMethod: string
    status: OrderStatus
    discounts?: Discount[]
    shippingCost?: Price
    shippingRates?: EasypostRate[]
    selectedShippingRateId?: string
    shippingInsuranceAmt?: number
    carrier?: string
    trackingCode?: string
    estDeliveryDays?: number
    postageLabelUrl?: string
    savePaymentInfo?: boolean
    shipmentId?: string
    stripeCardId?: string
    stripeOrderId?: string
    stripeSource?: string
    stripeToken?: StripeCardToken
    customer?: OrderCustomer
}
