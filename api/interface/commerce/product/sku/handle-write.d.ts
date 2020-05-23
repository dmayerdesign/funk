import { ChangeHandler } from '@funk/functions/helpers/listen/change-handler'
import { MarshalledSku } from '@funk/model/commerce/product/sku/sku'
import { store } from '@funk/plugins/persistence/server-store'

declare const handleWrite: ChangeHandler<MarshalledSku>

declare const construct: (deps?: { store: typeof store }) => typeof handleWrite

export { construct }
export default handleWrite
