import * as cors from 'cors'
import * as express from 'express'

const corsApp = express()

corsApp.use(cors({ origin: true }))

export { corsApp }
