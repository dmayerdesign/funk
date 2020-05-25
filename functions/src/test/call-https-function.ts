import { FUNCTIONS_BASE_URL } from "@funk/config"
import httpClient, { Response } from "@funk/functions/helpers/http/client"

export default async function<ResponseDataType = any>(
  functionName: string,
  requestData: any
): Promise<Response<ResponseDataType>>
{
  return await httpClient.post(`${FUNCTIONS_BASE_URL}/${functionName}`, requestData)
}
