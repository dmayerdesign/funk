import * as express from 'express'
import handleError from './handle-error'

export default function(): express.Application {
  const app = express()
  app.use(handleError)
  return app
}
