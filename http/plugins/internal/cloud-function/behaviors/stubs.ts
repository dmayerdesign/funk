import {
  HttpClient,
  RequestConfig,
} from "@funk/http/plugins/internal/client/client"

export const createHttpClientStub = (fakeResponse?: any): HttpClient => ({
  get: async (_url: string, _config?: RequestConfig): Promise<any> =>
    fakeResponse,
  delete: async (_url: string, _config?: RequestConfig): Promise<any> =>
    fakeResponse,
  head: async (_url: string, _config?: RequestConfig): Promise<any> =>
    fakeResponse,
  options: async (_url: string, _config?: RequestConfig): Promise<any> =>
    fakeResponse,
  post: async (
    _url: string,
    _data?: any,
    _config?: RequestConfig,
  ): Promise<any> => fakeResponse,
  put: async (
    _url: string,
    _data?: any,
    _config?: RequestConfig,
  ): Promise<any> => fakeResponse,
  patch: async (
    _url: string,
    _data?: any,
    _config?: RequestConfig,
  ): Promise<any> => fakeResponse,
})
