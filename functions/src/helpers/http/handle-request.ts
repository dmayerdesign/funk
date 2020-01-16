import { NextFunction, Request as ExpressRequest, RequestHandler as ExpressRequestHandler,
  Response } from 'express'

export interface Request<BodyType = any> extends ExpressRequest
{
  body: BodyType
}

export type ResponseTypes =
  | String | Promise<String>
  | Boolean | Promise<Boolean>
  | object | Promise<object>
  | undefined | Promise<undefined>
  | void | Promise<void>

export type RequestHandler<
    ResponseType extends ResponseTypes = undefined,
    RequestBodyType = any,
  > = (request: Request<RequestBodyType>, response: Response, next: NextFunction) =>
    ResponseType

export default function<
  ResponseType extends ResponseTypes = undefined,
  RequestBodyType = any,
  >(
  handler: RequestHandler<ResponseType, RequestBodyType>
): ExpressRequestHandler
{
  return function(request, response, next): void
  {
    try
    {
      const handlerResult = handler(request, response, next)
      if (response.headersSent)
      {
        return next()
      }
      else if (typeof handlerResult === 'object'
        && typeof (handlerResult as Promise<any>)['then'] === 'function')
      {
        (handlerResult as Promise<any>)
          .then((value) =>
          {
            if (response.headersSent) next()
            else
            {
              send(response, value)
            }
          })
          .catch(next)
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
