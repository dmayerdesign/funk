export interface GetShipmentProvider
{ (secret: string, options?: any): any }

export default GetShipmentProvider

export function construct(shipmentServiceProviderCtor: any):
  (secret: string) => any
