import { https } from 'firebase-functions'
import createFunction from '../helpers/http/create-function'

export default https.onRequest(createFunction((request, response) =>
{
  const delay = Math.random() * 3000
  setTimeout(() =>
    response.send([`Hello from Firebase! Here's your query: ${JSON.stringify(request.query)}`]),
    delay)
}))
