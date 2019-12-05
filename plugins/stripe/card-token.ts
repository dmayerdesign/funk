import { CardHash } from './card-hash'

export interface CardToken
{
  object: string
  id: string
  client_ip: string
  created: number
  livemode: boolean
  /** "card" | "bank_account" */
  type: string
  used: boolean
  card?: CardHash
}
