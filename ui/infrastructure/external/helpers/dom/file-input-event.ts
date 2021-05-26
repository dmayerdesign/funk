export type FileInputEvent = InputEvent & {
  target: { files: File[] }
}
