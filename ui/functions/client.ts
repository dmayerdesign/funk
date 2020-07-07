import { HttpClient } from "@angular/common/http"

export interface FunctionsClient {
  rpc: FunctionsClient["post"]
  rpcAuthorized: FunctionsClient["postAuthorized"]

  get<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    options?: Parameters<HttpClient["get"]>[1]): ReturnType<FnType>

  getAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    options?: Parameters<HttpClient["get"]>[1]): ReturnType<FnType>

  options<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    options?: Parameters<HttpClient["options"]>[1]): ReturnType<FnType>

  optionsAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    options?: Parameters<HttpClient["options"]>[1]): ReturnType<FnType>

  post<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["post"]>[2]): ReturnType<FnType>

  postAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["post"]>[2]): ReturnType<FnType>

  put<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["put"]>[2]): ReturnType<FnType>

  putAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["put"]>[2]): ReturnType<FnType>

  patch<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["patch"]>[2]): ReturnType<FnType>

  patchAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["patch"]>[2]): ReturnType<FnType>
}
