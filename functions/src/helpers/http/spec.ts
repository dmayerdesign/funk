import { construct as constructCreateApp } from "@funk/functions/helpers/http/create-app"
import handleError from "@funk/functions/helpers/http/handle-error"
import { Request } from "@funk/functions/helpers/http/handle-request"
import { StatusCode } from "@funk/model/http/status-code"
import { Response } from "express"

describe("http", () =>
{
  describe("createApp", () =>
  {
    it("should create an express-style app", () =>
    {
      const app = constructCreateApp()()

      expect(typeof app).toBe("function")
      expect(typeof app.listen).toBe("function")
    })
  })

  describe("handleError", () =>
  {
    it("should handle an error and send it", () =>
    {
      const mockArgs: {
        error: Error
        request: Request
        response: Response
        next: () => any
      } = {
        error: new Error("test"),
        request: {} as Request,
        response: {
          status: (..._args: any[]) => mockArgs.response,
          send: (..._args: any[]) => mockArgs.response,
        } as Response,
        next: () => { },
      }
      spyOn(mockArgs.response, "status").and.callThrough()
      spyOn(mockArgs.response, "send").and.callThrough()

      handleError(mockArgs.error, mockArgs.request, mockArgs.response, mockArgs.next)

      expect(mockArgs.response.status).toHaveBeenCalledTimes(1)
      expect(mockArgs.response.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
      expect(mockArgs.response.send).toHaveBeenCalledTimes(1)
      expect(mockArgs.response.send).toHaveBeenCalledWith({ error: mockArgs.error })
    })

    it("should handle an error if the response has already been sent", () =>
    {
      const mockArgs = {
        error: new Error("test"),
        request: {} as Request,
        response: { headersSent: true } as Response,
        next: () => { },
      }
      spyOn(mockArgs, "next")

      handleError(mockArgs.error, mockArgs.request, mockArgs.response, mockArgs.next)

      expect(mockArgs.next).toHaveBeenCalledTimes(1)
      expect(mockArgs.next).toHaveBeenCalledWith(mockArgs.error)
    })
  })
})
