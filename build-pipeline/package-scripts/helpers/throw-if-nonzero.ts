import { ShellString } from "shelljs"
import { InvalidInputError } from "../../../model/error/invalid-input-error"

export default function ({ code }: ShellString) {
  if (code !== 0) {
    throw new InvalidInputError()
  }
}
