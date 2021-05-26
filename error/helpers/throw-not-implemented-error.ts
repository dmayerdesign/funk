import { NotImplementedError } from "../model/not-implemented-error"

export default function (
  ...args: ConstructorParameters<typeof NotImplementedError>
): never {
  throw new NotImplementedError(...args)
}
