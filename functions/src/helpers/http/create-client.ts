import { FUNCTIONS_BASE_URL } from '@funk/config'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import Axios, { AxiosRequestConfig } from 'axios'

export default function<RequestBodyType = any, ResponseType = any>(endpointName: string):
  (requestBody: RequestBodyType) => Promise<ResponseType>
  {
    return function(request: Partial<RequestWithBody<RequestBodyType>>): Promise<ResponseType>
    {
      return Axios.request({
        url: `${FUNCTIONS_BASE_URL}/${endpointName}`,
        ...request as AxiosRequestConfig,
      })
    }
  }
