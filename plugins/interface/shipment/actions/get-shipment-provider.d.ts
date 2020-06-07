export default function getShipmentProvider(secret: string): any

export function construct(shipmentServiceProviderCtor: any): typeof getShipmentProvider

export type GetShipmentProvider = ReturnType<typeof construct>
