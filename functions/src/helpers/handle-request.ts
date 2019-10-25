import { Request, RequestHandler as ExpressRequestHandler, Response } from 'express'

export type RequestHandler = (request: Request, response: Response) => any

export default function(handler: RequestHandler | ExpressRequestHandler): ExpressRequestHandler {

  return function(request, response, next): void {
    try {
      const handlerResult = handler(request, response, next)

      if (response.headersSent) {
        return
      }
      else {
        if (typeof handlerResult.then === 'function') {
          (handlerResult as Promise<any>)
            .then((value) => response.send(value))
            .catch(next)
        }
        else {
          response.send(handlerResult)
        }
      }
    }
    catch (error) {
      next(error)
    }
  }
}
