import createFunction from '@funk/functions/helpers/http/create-function'
import { Order } from '@funk/model/commerce/order/order'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import createEmail from '@funk/model/email/actions/create-email'
import { resolve } from 'path'

export default createFunction<string, Partial<DbDocumentInput<Order>>>(({ body }) =>
  createEmail(
    { skus: body.skus },
    resolve(__dirname, '../../', 'assets/email-templates', 'receipt.hbs'),
  )
)
