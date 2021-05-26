import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import throwPresentableError from "@funk/helpers/throw-presentable-error"

export function construct() {
  return function (fileInputChangeEvent: Event): Promise<string> {
    return new Promise((resolve, reject) => {
      const file = (fileInputChangeEvent as InputEvent & {
        target: { files: File[] }
      }).target?.files?.[0]
      if (!file) {
        throw new InvalidInputError("The input must be of type `file`.")
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = (error) => {
        throwPresentableError(
          new Error("An error occurred while trying to read the file."),
        )
        reject(
          "[funk] An error occurred while trying to read the file. Details:\n" +
            error.toString(),
        )
      }
    })
  }
}

export type CreateCoverImagePreviewUrl = ReturnType<typeof construct>
