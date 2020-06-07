export function construct(paymentServiceProviderCtor: any): typeof getPaymentProvider

export default function getPaymentProvider(secret: string, options?: any): any

export type GetPaymentProvider = ReturnType<typeof construct>
