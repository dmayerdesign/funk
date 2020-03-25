export interface KitchenSinkState
{
  someData: any
  someDataLoading: boolean
}

export function createInitialState(): KitchenSinkState
{
  return {
    someData: undefined,
    someDataLoading: false,
  }
}
