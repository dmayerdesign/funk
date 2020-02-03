import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'

export default createRpcFunction(() =>
{
  return { foo: 'bar' }
})
