import createFunction from '@funk/functions/helpers/http/create-function'
import createEmail from '@funk/model/email/actions/create-email'
import { resolve } from 'path'

export default createFunction(() =>
  createEmail(
    { skus: [{ name: 'My Sku 1' }] },
    resolve(__dirname, '../../', 'assets/email-templates', 'receipt.hbs'),
  )
)
