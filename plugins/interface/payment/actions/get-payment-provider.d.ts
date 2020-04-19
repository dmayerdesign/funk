export interface GetPaymentProvider
{ (secret: string, options?: any): any }

export default GetPaymentProvider

export function construct(paymentServiceProviderCtor: any):
  (secret: string, options?: any) => any
