import { https } from 'firebase-functions'
import { createCorsApp } from '../helpers/create-cors-app'

const app = createCorsApp(true)
app.get('/', ({ query }, { send }) => {
  send(`Hello from Firebase! Here's your query: ${query}`)
})

export default https.onRequest(app)
