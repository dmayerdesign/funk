export interface Action<StateType> {
  type: string
  execute: (state: StateType) => Promise<StateType>
}
