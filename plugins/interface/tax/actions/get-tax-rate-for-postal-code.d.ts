export interface Input {
  postalCode: string
}

export type Output = number

export default function({ postalCode }: Input): Promise<Output>
