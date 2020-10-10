import { HttpClient } from "@angular/common/http"
import { Inject, Injectable } from "@angular/core"
import { FUNCTIONS_BASE_URL } from "@funk/configuration"
import { asPromise } from "@funk/helpers/as-promise"
import { USER_ID_TOKEN } from "@funk/ui/app/identity/tokens"
import { UserIdToken } from "@funk/ui/core/identity/user-id-token"
import { map } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class FunctionsClient {
  public constructor(
    private _httpClient: HttpClient,
    @Inject(USER_ID_TOKEN) private _userIdToken: UserIdToken
  ) {}

  public rpc = this.post
  public rpcAuthorized = this.postAuthorized

  public get<ResolvedValueType>(
    functionName: string,
    options?: Parameters<HttpClient["get"]>[1]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._httpClient.get<unknown>(
        `${FUNCTIONS_BASE_URL}/${functionName}`,
        options
      )
    ) as Promise<ResolvedValueType>
  }

  public getAuthorized<ResolvedValueType>(
    functionName: string,
    options?: Parameters<HttpClient["get"]>[1]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._userIdToken.pipe(map((token) => `Bearer ${token}`))
    ).then((authorization) =>
      this.get<ResolvedValueType>(functionName, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        },
      })
    ) as Promise<ResolvedValueType>
  }

  public options<ResolvedValueType>(
    functionName: string,
    options?: Parameters<HttpClient["options"]>[1]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._httpClient.options<unknown>(
        `${FUNCTIONS_BASE_URL}/${functionName}`,
        options
      )
    ) as Promise<ResolvedValueType>
  }

  public optionsAuthorized<ResolvedValueType>(
    functionName: string,
    options?: Parameters<HttpClient["options"]>[1]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._userIdToken.pipe(map((token) => `Bearer ${token}`))
    ).then((authorization) =>
      this.options<ResolvedValueType>(functionName, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        },
      })
    ) as Promise<ResolvedValueType>
  }

  public post<PayloadType, ResolvedValueType>(
    functionName: string,
    payload?: PayloadType,
    options?: Parameters<HttpClient["post"]>[2]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._httpClient.post<unknown>(
        `${FUNCTIONS_BASE_URL}/${functionName}`,
        payload,
        options
      )
    ) as Promise<ResolvedValueType>
  }

  public postAuthorized<PayloadType, ResolvedValueType>(
    functionName: string,
    payload?: PayloadType,
    options?: Parameters<HttpClient["post"]>[2]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._userIdToken.pipe(map((token) => `Bearer ${token}`))
    ).then((authorization) =>
      this.post<PayloadType, ResolvedValueType>(functionName, payload, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        },
      })
    ) as Promise<ResolvedValueType>
  }

  public put<PayloadType, ResolvedValueType>(
    functionName: string,
    payload?: PayloadType,
    options?: Parameters<HttpClient["put"]>[2]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._httpClient.put<unknown>(
        `${FUNCTIONS_BASE_URL}/${functionName}`,
        payload,
        options
      )
    ) as Promise<ResolvedValueType>
  }

  public putAuthorized<PayloadType, ResolvedValueType>(
    functionName: string,
    payload?: PayloadType,
    options?: Parameters<HttpClient["put"]>[2]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._userIdToken.pipe(map((token) => `Bearer ${token}`))
    ).then((authorization) =>
      this.put<PayloadType, ResolvedValueType>(functionName, payload, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        },
      })
    ) as Promise<ResolvedValueType>
  }

  public patch<PayloadType, ResolvedValueType>(
    functionName: string,
    payload?: PayloadType,
    options?: Parameters<HttpClient["patch"]>[2]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._httpClient.patch<unknown>(
        `${FUNCTIONS_BASE_URL}/${functionName}`,
        payload,
        options
      )
    ) as Promise<ResolvedValueType>
  }

  public patchAuthorized<PayloadType, ResolvedValueType>(
    functionName: string,
    payload?: PayloadType,
    options?: Parameters<HttpClient["patch"]>[2]
  ): Promise<ResolvedValueType> {
    return asPromise(
      this._userIdToken.pipe(map((token) => `Bearer ${token}`))
    ).then((authorization) =>
      this.patch<PayloadType, ResolvedValueType>(functionName, payload, {
        ...options,
        headers: {
          ...options?.headers,
          authorization,
        },
      })
    ) as Promise<ResolvedValueType>
  }
}
