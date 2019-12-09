import { NextFunction, Request, RequestHandler as ExpressRequestHandler, Response } from 'express'

export type ResponseTypes =
  | String | Promise<String>
  | Boolean | Promise<Boolean>
  | object | Promise<object>
  | undefined | Promise<undefined>
  | void | Promise<void>

export type RequestHandler<ResponseType extends ResponseTypes = undefined> =
  (request: Request, response: Response, next: NextFunction) => ResponseType

export default function<ResponseType extends ResponseTypes = undefined>(
  handler: RequestHandler<ResponseType>
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
              response.send(value)
            }
          })
          .catch(next)
      }
      else
      {
        response.send(handlerResult)
      }
    }
    catch (error)
    {
      next(error)
    }
  }
}
