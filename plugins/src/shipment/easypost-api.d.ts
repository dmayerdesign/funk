declare module "@easypost/api" {
  class Address
  {
    public constructor(input: any)
    public save(): Promise<any>
  }
  class Parcel
  {
    public constructor(input: any)
    public save(): Promise<any>
  }
  class Shipment
  {
    public constructor(input: any)
    public save(): Promise<any>
  }

  export default class Easypost
  {
    public Address: typeof Address
    public Parcel: typeof Parcel
    public Shipment: typeof Shipment

    public constructor(shipmentProviderSecret: string)
  }
}
