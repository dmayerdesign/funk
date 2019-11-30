import { FIRE_PROJECT_ID } from '@funk/config'
import { UserRole } from '@funk/model/auth/user-role'
import { Cart, CARTS } from '@funk/model/commerce/cart/cart'
import { UserConfig, USER_CONFIGS } from '@funk/model/user/user-config'
import { Firestore } from '@google-cloud/firestore'
import { auth as adminAuth } from 'firebase-admin'
import { auth } from 'firebase-functions'

export default auth.user().onCreate(async function(user): Promise<any>
{
  const firestore = new Firestore({ projectId: FIRE_PROJECT_ID })

  await adminAuth().setCustomUserClaims(user.uid, { role: UserRole.ANONYMOUS })

  if (user.email)
  {
    const newUserConfig: UserConfig = {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
    }
    const newCart: Cart = {
      // Exclude `type` to save space.
      products: []
    }

    return Promise.all([
      firestore.collection(USER_CONFIGS).doc(user.uid).set(newUserConfig),
      firestore.collection(CARTS).doc(user.uid).set(newCart),
    ])
  }

})
