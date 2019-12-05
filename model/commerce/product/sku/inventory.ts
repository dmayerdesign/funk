export interface Inventory
{
  type: 'finite' | 'infinite' | 'bucket'
  quantity?: number
  value?: 'in_stock' | 'limited' | 'out_of_stock'
}
