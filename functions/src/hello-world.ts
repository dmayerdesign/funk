import { HELLO_WORLD } from '@funk/config'
import { https } from 'firebase-functions'

export default https.onRequest((request, response) => {
  response.json({
    foo: `Hello from Firebase! Here's your query: ${JSON.stringify(request.query)}`,
    bar: HELLO_WORLD
  })
})
