import { Order } from '@funk/model/commerce/order/order'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import createEmail from '@funk/model/email/actions/create-email'
import { resolve } from 'path'

export default (partialOrder: Partial<DbDocumentInput<Order>>) =>
  createEmail(
    { skus: partialOrder.skus },
    resolve(__dirname, '../../', 'assets/email-templates', 'receipt.hbs'),
  )
