import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'

export default createRpcFunction(async () =>
{
  return new Promise((resolve) =>
  {
    const delay = Math.random() * 3000
    setTimeout(() =>
      resolve({ hello: 'world' }),
      delay)
  })
})
