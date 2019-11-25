import { Request, RequestHandler as ExpressRequestHandler, Response } from 'express'

export type RequestHandler = (request: Request, response: Response) => any

export default function(
  handler: RequestHandler | ExpressRequestHandler): ExpressRequestHandler
{
  return function(request, response, next): void
  {
    try
    {
      const handlerResult = handler(request, response, next)
      if (response.headersSent) return
      // If a function is returned, assume it's a `next` function, and call it.
      else if (typeof handlerResult === 'function') handlerResult()
      // Otherwise, assume the return value is intended to be the response.
      else if (typeof handlerResult.then === 'function') (handlerResult as Promise<any>)
        .then((value) =>
        {
          if (response.headersSent) next()
          else response.send(value)
        })
        .catch(next)
      else response.send(handlerResult)
    }
    catch (error)
    {
      next(error)
    }
  }
}
