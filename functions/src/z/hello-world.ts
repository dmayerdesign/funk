import { https } from 'firebase-functions'
import { createCorsApp } from '../helpers/create-cors-app'

const app = createCorsApp(true)
app.get('/', (request, response) => {
  const delay = Math.random() * 3000
  setTimeout(() => {
    response.send([`Hello from Firebase! Here's your query: ${JSON.stringify(request.query)}`])
  }, delay)
})

export default https.onRequest(app)
