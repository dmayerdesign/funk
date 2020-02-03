import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import loudlyLog from '@funk/helpers/loudly-log'

export default createRpcFunction<void>(async (): Promise<string> =>
{
  loudlyLog('called adminSanityCheckAsync')
  return 'You are sane, asynchronously!'
})
