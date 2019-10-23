import createFunction from '../../helpers/create-function'

export default createFunction((request, response) => {
  response.send({ foo: 'bar' })
})
