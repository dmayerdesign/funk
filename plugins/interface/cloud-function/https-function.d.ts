import { Request, Response } from 'express'

export type HttpsFunction = (req: Request, resp: Response) => void
