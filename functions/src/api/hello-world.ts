import { https } from 'firebase-functions'
import createCorsFunction from '../helpers/create-cors-function'

export default https.onRequest(createCorsFunction(true, (request, response) => {
  const delay = Math.random() * 3000
  setTimeout(() => {
    response.send([`Hello from Firebase! Here's your query: ${JSON.stringify(request.query)}`])
  }, delay)
}))
