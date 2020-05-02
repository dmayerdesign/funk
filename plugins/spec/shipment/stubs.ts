export const constructGetShipmentProviderStub = () =>
{
  const saveAddress = jasmine.createSpy('saveAddress')
  const saveParcel = jasmine.createSpy('saveParcel')
  const saveShipment = jasmine.createSpy('saveShipment')

  class ShipmentProviderStub
  {
    public Address = class Address {
      constructor(_input: any) { }
      public save = saveAddress
    }
    public Parcel = class Parcel {
      constructor(_input: any) { }
      public save = saveParcel
    }
    public Shipment = class Shipment {
      constructor(_input: any) { }
      public save = saveShipment
    }
  }
  const sspInstance = new ShipmentProviderStub()
  const getShipmentProvider = jasmine
      .createSpy('getShipmentProvider', () => sspInstance as any)
      .and.callThrough()
  return ({
    getShipmentProvider,
    sspInstance,
    saveAddress,
    saveParcel,
    saveShipment,
  })
}

