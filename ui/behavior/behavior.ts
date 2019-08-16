export interface Behavior<StateType> {
  type: string
  execute: (state: StateType) => Promise<StateType>
}
