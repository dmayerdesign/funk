import { FUNCTIONS_BASE_URL } from "@funk/configuration"
import httpClient, { Response } from "@funk/http/plugins/internal/client/client"

export default async function <ResponseDataType = any>(
  functionName: string,
  requestData: any,
): Promise<Response<ResponseDataType>> {
  return await httpClient.post(
    `${FUNCTIONS_BASE_URL}/${functionName}`,
    requestData,
  )
}
