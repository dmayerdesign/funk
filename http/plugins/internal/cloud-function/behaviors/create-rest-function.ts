import { RequestMethod } from "@funk/http/domain/request-method"
import createApp from "@funk/http/plugins/internal/cloud-function/behaviors/create-app"
import createFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-function"
import handleError from "@funk/http/plugins/internal/cloud-function/behaviors/handle-error"
import handleRequest, {
  HandlerReturnTypes,
  RequestHandlers,
} from "@funk/http/plugins/internal/cloud-function/behaviors/handle-request"
import { HttpsFunction } from "@funk/http/plugins/internal/cloud-function/https-function"
import { IRouter, IRouterMatcher } from "express"
import { camelCase } from "lodash"

export interface CrudHandlerMap {
  list?: RequestHandlers
  get?: RequestHandlers
  create?: RequestHandlers
  update?: RequestHandlers
  delete?: RequestHandlers
  upsertMany?: RequestHandlers
}

export type CrudMethod = keyof CrudHandlerMap

export function construct<
  LastHandlerReturnType extends HandlerReturnTypes = HandlerReturnTypes,
  RequestBodyType = any
>() {
  return function (crudHandlerMap: CrudHandlerMap): HttpsFunction {
    const app = createApp()

    Object.keys(crudHandlerMap).forEach((key) => {
      const crudMethod = key as CrudMethod
      const value = crudHandlerMap[crudMethod] as RequestHandlers
      const requestMethod = getRequestMethodForCrudMethod(crudMethod)
      const requestMethodFnName = camelCase(requestMethod) as keyof IRouter
      const handlers = [...value]
      const handler = handlers.pop()!
      const middlewares = handlers

      ;(app[requestMethodFnName] as IRouterMatcher<any>)(
        getPathForCrudMethod(crudMethod),
        ...middlewares,
        handleRequest<LastHandlerReturnType, RequestBodyType>(handler),
        handleError,
      )
    })

    return createFunction(app)
  }
}

function getRequestMethodForCrudMethod(crudMethod: CrudMethod): RequestMethod {
  switch (crudMethod) {
    case "list":
    case "get":
      return RequestMethod.GET
    case "create":
      return RequestMethod.POST
    case "update":
      return RequestMethod.PUT
    case "delete":
      return RequestMethod.DELETE
    case "upsertMany":
      return RequestMethod.PATCH
    default:
      return RequestMethod.UNDEFINED
  }
}

function getPathForCrudMethod(crudMethod: CrudMethod): string {
  if (
    crudMethod === "list" ||
    crudMethod === "update" ||
    crudMethod === "delete"
  ) {
    return "/:id"
  }
  return "/"
}

export default function <
  LastHandlerReturnType extends HandlerReturnTypes = HandlerReturnTypes,
  RequestBodyType = any
>(handlerMap: CrudHandlerMap): HttpsFunction {
  return construct<LastHandlerReturnType, RequestBodyType>()(handlerMap)
}
