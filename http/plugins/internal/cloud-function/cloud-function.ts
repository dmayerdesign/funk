export { CloudFunction as CloudFunctionImpl } from "firebase-functions"

export type CloudFunction = (
  input: any,
  context?: any,
) => PromiseLike<any> | any
