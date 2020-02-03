import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import loudlyLog from '@funk/helpers/loudly-log'

export default createRpcFunction<void>((): string =>
{
  loudlyLog('called adminSanityCheck')
  return 'You are sane!'
})
