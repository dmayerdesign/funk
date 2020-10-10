export type OneOf<T, U, V = U> =
  | ({ [P in keyof T]?: never } & { [P in keyof U]?: never } & V)
  | ({ [P in keyof U]?: never } & { [P in keyof V]?: never } & T)
  | ({ [P in keyof V]?: never } & { [P in keyof T]?: never } & U)
