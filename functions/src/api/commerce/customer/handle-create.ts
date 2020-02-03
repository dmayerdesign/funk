import { CLOUD_PROJECT_ID } from '@funk/config'
import createOrderForCustomer from '@funk/model/commerce/order/actions/create-order-for-customer'
import { ORDERS } from '@funk/model/commerce/order/order'
import { authEvents } from '@funk/plugins/auth/auth-events'
import { Firestore } from '@google-cloud/firestore'

export default authEvents().user().onCreate(async function(user): Promise<any>
{
  if (user.email)
  {
    const firestore = new Firestore({ projectId: CLOUD_PROJECT_ID })
    const newOrder = createOrderForCustomer({
      userId: user.uid,
    })
    await firestore.collection(ORDERS).doc(newOrder.id).set(newOrder)
  }
})
