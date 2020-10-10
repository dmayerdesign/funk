import Easypost from "@easypost/api"

export function construct(paymentServiceProviderCtor = Easypost) {
  return function (secret: string): Easypost {
    return new paymentServiceProviderCtor(secret)
  }
}

export default construct()

export type GetShipmentProvider = ReturnType<typeof construct>
