export interface AvataxResponse {
  totalRate: number
  rates: AvataxRate[]
}

export interface AvataxRate {
  rate: number // 0.06
  name: string // "MI STATE TAX"
  type: string // "State"
}
