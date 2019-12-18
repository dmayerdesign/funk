import auditOnWrite from '@funk/functions/helpers/audit/on-write'
import { Order, ORDERS } from '@funk/model/commerce/order/order'
import { firestore } from 'firebase-functions'

export default firestore.document(`${ORDERS}/{id}`).onWrite(
  auditOnWrite<Order>(`audit.${ORDERS}`)
)
