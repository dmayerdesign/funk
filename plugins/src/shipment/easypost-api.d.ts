declare module '@easypost/api' {
  class Address {
    constructor(input: any)
    public save(): Promise<any>
  }
  class Parcel {
    constructor(input: any)
    public save(): Promise<any>
  }
  class Shipment {
    constructor(input: any)
    public save(): Promise<any>
  }

  export default class Easypost {
    public Address: typeof Address
    public Parcel: typeof Parcel
    public Shipment: typeof Shipment

    constructor(shipmentProviderSecret: string)
  }
}
