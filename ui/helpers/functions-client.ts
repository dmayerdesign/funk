import { HttpClient } from "@angular/common/http"
import { Inject, Injectable } from "@angular/core"
import { FUNCTIONS_BASE_URL } from "@funk/config"
import { USER_ID_TOKEN } from "@funk/ui/app/identity/tokens"
import { UserIdToken } from "@funk/ui/core/identity/user-id-token"
import { asPromise } from "@funk/helpers/as-promise"
import { map } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class FunctionsClient
{
  public constructor(
    private _httpClient: HttpClient,
    @Inject(USER_ID_TOKEN) private _userIdToken: UserIdToken
  )
  { }

  public rpc = this.post
  public rpcAuthorized = this.postAuthorized

  public get<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    options?: Parameters<HttpClient["get"]>[1]): ReturnType<FnType>
  {
    return asPromise(this._httpClient.get<unknown>(
      `${FUNCTIONS_BASE_URL}/${functionName}`, options)) as
        ReturnType<FnType>
  }

  public getAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    options?: Parameters<HttpClient["get"]>[1]): ReturnType<FnType>
  {
    return asPromise(this._userIdToken
      .pipe(map((token) => `Bearer ${token}`)))
      .then((authorization) => this.get<FnType>(functionName, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        }})) as ReturnType<FnType>
  }

  public options<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    options?: Parameters<HttpClient["options"]>[1]): ReturnType<FnType>
  {
    return asPromise(this._httpClient.options<unknown>(
      `${FUNCTIONS_BASE_URL}/${functionName}`, options)) as
        ReturnType<FnType>
  }

  public optionsAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    options?: Parameters<HttpClient["options"]>[1]): ReturnType<FnType>
  {
    return asPromise(this._userIdToken
      .pipe(map((token) => `Bearer ${token}`)))
      .then((authorization) => this.options<FnType>(functionName, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        }})) as ReturnType<FnType>
  }

  public post<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["post"]>[2]): ReturnType<FnType>
  {
    return asPromise(this._httpClient.post<unknown>(
      `${FUNCTIONS_BASE_URL}/${functionName}`, payload, options)) as
        ReturnType<FnType>
  }

  public postAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["post"]>[2]): ReturnType<FnType>
  {
    return asPromise(this._userIdToken
      .pipe(map((token) => `Bearer ${token}`)))
      .then((authorization) => this.post<FnType>(functionName, payload, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        }})) as ReturnType<FnType>
  }

  public put<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["put"]>[2]): ReturnType<FnType>
  {
    return asPromise(this._httpClient.put<unknown>(
      `${FUNCTIONS_BASE_URL}/${functionName}`, payload, options)) as
        ReturnType<FnType>
  }

  public putAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["put"]>[2]): ReturnType<FnType>
  {
    return asPromise(this._userIdToken
      .pipe(map((token) => `Bearer ${token}`)))
      .then((authorization) => this.put<FnType>(functionName, payload, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        }})) as ReturnType<FnType>
  }

  public patch<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["patch"]>[2]): ReturnType<FnType>
  {
    return asPromise(this._httpClient.patch<unknown>(
      `${FUNCTIONS_BASE_URL}/${functionName}`, payload, options)) as
        ReturnType<FnType>
  }

  public patchAuthorized<FnType extends (...args: any[]) => Promise<any>>(
    functionName: string,
    payload?: Parameters<FnType>[0],
    options?: Parameters<HttpClient["patch"]>[2]): ReturnType<FnType>
  {
    return asPromise(this._userIdToken
      .pipe(map((token) => `Bearer ${token}`)))
      .then((authorization) => this.patch<FnType>(functionName, payload, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        }})) as ReturnType<FnType>
  }
}
