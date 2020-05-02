import Easypost from '@easypost/api'

export const construct = (paymentServiceProviderCtor = Easypost) =>
  function(secret: string): Easypost
  {
    return new paymentServiceProviderCtor(secret)
  }

export default construct()
