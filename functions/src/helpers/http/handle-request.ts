import { Request as ExpressRequest, RequestHandler as ExpressRequestHandler, NextFunction,
  Response } from "express"

export interface Request<BodyType = any> extends ExpressRequest {
  body: BodyType
}

export type HandlerReturnTypes =
  | string | Promise<string>
  | boolean | Promise<boolean>
  | object | Promise<object>
  | undefined | Promise<undefined>
  | void | Promise<void>

export type RequestHandler<
  HandlerReturnType extends HandlerReturnTypes = undefined,
  RequestBodyType = any,
> = (request: Request<RequestBodyType>, response: Response, next: NextFunction) =>
HandlerReturnType

export type RequestHandlers =
  [ RequestHandler<any> ]
  | [
    RequestHandler<any>,
    ...RequestHandler<any>[]
  ]

export default function<
  HandlerReturnType extends HandlerReturnTypes = undefined,
  RequestBodyType = any,
>(
  handler: RequestHandler<HandlerReturnType, RequestBodyType>
): ExpressRequestHandler
{
  return async function(request, response, next): Promise<void>
  {
    try
    {
      const handlerResult = handler(request, response, next)
      if (response.headersSent)
      {
        return next()
      }
      else if (typeof handlerResult === "object"
        && typeof (handlerResult as Promise<any>)["then"] === "function")
      {
        const value = await (handlerResult as Promise<any>)
        if (response.headersSent) next()
        else
        {
          send(response, value)
        }
      }
      else
      {
        send(response, handlerResult)
      }
    }
    catch (error)
    {
      next(error)
    }
  }
}

function send(response: Response, value: any): Response
{
  // TODO: Add conditional auditing of RPC responses here.
  return response.send(value)
}
