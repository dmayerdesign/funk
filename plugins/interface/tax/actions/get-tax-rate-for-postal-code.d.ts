export interface Input {
  postalCode: string
}

export type Output = Promise<number>

export default function({ postalCode }: Input): Output
