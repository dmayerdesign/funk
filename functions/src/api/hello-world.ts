import * as initCors from 'cors'
import { https } from 'firebase-functions'

const cors = initCors({
  origin: true,
})

export default https.onRequest((request, response) => cors(request, response, () => {
  response.json({
    text: `Hello from Firebase!!! Here's your query: ${JSON.stringify(request.query)}`,
  })
}))
