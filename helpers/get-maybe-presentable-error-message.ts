import { PRESENTABLE_ERROR_MARKER } from "@funk/helpers/throw-presentable-error"

/** "Presentable" means that it's marked with the {@link PRESENTABLE_ERROR_MARKER}. */
export default function (error: Error): string | undefined {
  if (error.message && error.message.indexOf(PRESENTABLE_ERROR_MARKER) > -1) {
    return error.message.replace(PRESENTABLE_ERROR_MARKER, "")
  }
  return undefined
}
