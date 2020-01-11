import { CLOUD_PROJECT_ID } from '@funk/config'
import { UserRole } from '@funk/model/auth/user-role'
import createOrderForCustomer from '@funk/model/commerce/order/actions/create-order-for-customer'
import { ORDERS } from '@funk/model/commerce/order/order'
import { UserConfig, USER_CONFIGS } from '@funk/model/user/user-config'
import { authAdmin } from '@funk/plugins/auth/auth-admin'
import { authEvents } from '@funk/plugins/auth/auth-events'
import { Firestore } from '@google-cloud/firestore'

export default authEvents().user().onCreate(async function(user): Promise<any>
{
  await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.ANONYMOUS })

  if (user.email)
  {
    const firestore = new Firestore({ projectId: CLOUD_PROJECT_ID })
    const newUserConfig: UserConfig = {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
    }
    const newOrder = createOrderForCustomer({
      userId: user.uid,
    })

    await Promise.all([
      firestore.collection(USER_CONFIGS).doc(newUserConfig.id).set(newUserConfig),
      firestore.collection(ORDERS).doc(newOrder.id).set(newOrder),
    ])
  }

})
