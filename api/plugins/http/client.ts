import { RequestMethod } from "@funk/model/http/request-method"
import axios from "axios"

export interface RequestConfig {
  url?: string
  method?: RequestMethod
  headers?: { [key: string]: string }
}

export interface Response<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request?: any
}

export interface HttpClient {
  get<T = any, R = Response<T>>(url: string, config?: RequestConfig): Promise<R>
  delete<T = any, R = Response<T>>(
    url: string,
    config?: RequestConfig,
  ): Promise<R>
  head<T = any, R = Response<T>>(
    url: string,
    config?: RequestConfig,
  ): Promise<R>
  options<T = any, R = Response<T>>(
    url: string,
    config?: RequestConfig,
  ): Promise<R>
  post<T = any, R = Response<T>>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<R>
  put<T = any, R = Response<T>>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<R>
  patch<T = any, R = Response<T>>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<R>
}

// Never throw an HTTP error response.
axios.defaults.validateStatus = () => true

export default axios as HttpClient
