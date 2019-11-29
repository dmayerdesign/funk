import { FIRE_PROJECT_ID } from '@funk/config'
import { Cart, CARTS } from '@funk/model/commerce/cart/cart'
import { UserConfig, USER_CONFIGS } from '@funk/model/user/user-config'
import { Firestore } from '@google-cloud/firestore'
import { auth } from 'firebase-functions'

export default auth.user().onCreate(async function(user): Promise<any>
{
  const firestore = new Firestore({ projectId: FIRE_PROJECT_ID })

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
