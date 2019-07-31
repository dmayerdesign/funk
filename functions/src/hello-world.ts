import { HELLO_WORLD } from '@funk/config'
import { https } from 'firebase-functions'

export default https.onRequest((request, response) => {
  response.json({
    foo: `Hello from Firebase! Here's your query: ${JSON.stringify(request.query)}`,
    bar: HELLO_WORLD
  })
})

// Front end, back end—who cares? I just want to build stuff!
// Funk aims to be a well-organized, well-optimized starting point for writing software.
