export interface EasypostRate {
  created_at: string
  updated_at: string
  /** "test" or "production". */
  mode: string
  /** Service level/name. */
  service: string
  /** Name of carrier. */
  carrier: string
  /** ID of the CarrierAccount record used to generate this rate. */
  carrier_account_id: string
  /** ID of the Shipment this rate belongs to. */
  shipment_id: string
  /** The actual rate quote for this service. */
  rate: string
  /** Currency for the rate. */
  currency: string
  /** The retail rate is the in-store rate given with no account. */
  retail_rate: string
  /** Currency for the retail rate. */
  retail_currency: string
  /** The list rate is the non-negotiated rate given for having an account with the carrier. */
  list_rate: string
  /** Currency for the list rate. */
  list_currency: string
  /** Delivery days for this service. */
  delivery_days: number
  /** Date for delivery. */
  delivery_date: string
  /** Indicates if delivery window is guaranteed (true) or not (false). */
  delivery_date_guaranteed: boolean
  /** This field is deprecated and should be ignored. */
  // est_delivery_days?: number
}
