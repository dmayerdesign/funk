import { ShellString } from "shelljs"
import { InvalidInputError } from "../../../error/model/invalid-input-error"

export default function ({ code }: ShellString) {
  if (code !== 0) {
    throw new InvalidInputError()
  }
}
