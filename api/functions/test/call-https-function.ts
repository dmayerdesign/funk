import httpClient, { Response } from "@funk/api/plugins/http/client"
import { FUNCTIONS_BASE_URL } from "@funk/configuration"

export default async function <ResponseDataType = any>(
  functionName: string,
  requestData: any
): Promise<Response<ResponseDataType>> {
  return await httpClient.post(
    `${FUNCTIONS_BASE_URL}/${functionName}`,
    requestData
  )
}
