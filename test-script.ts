import { NextFunction, Request, RequestHandler as ExpressRequestHandler, Response } from 'express'
import express from 'express'

async function helper(): Promise<string>
{
  await new Promise(resolve => setTimeout(resolve, 500))
  return 'some string'
}

const handlers = [
  async (): Promise<string> =>
  {
    return await helper()
  },
]

express()
  .get('/',
    ...handlers.map((handler) => handleRequest<ResponseType>(handler))
  )
  .listen(3000)

export type ResponseTypes =
  | String | Promise<String>
  | Boolean | Promise<Boolean>
  | object | Promise<object>
  | undefined | Promise<undefined>
  | void | Promise<void>

export type RequestHandler<ResponseType extends ResponseTypes = undefined> =
  (request: Request, response: Response, next: NextFunction) => ResponseType

export function handleRequest<ResponseType extends ResponseTypes = undefined>(
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
              console.log('====> send 1', value)
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
