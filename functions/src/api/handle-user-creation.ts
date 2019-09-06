import { Cart } from '@funk/shared/contracts/cart/cart'
import { UserConfig } from '@funk/shared/contracts/user/user-config'
import { Firestore } from '@google-cloud/firestore'
import { auth } from 'firebase-functions'
import 'firebase-functions'

export default auth.user().onCreate(async (user) => {
  const firestore = new Firestore({ projectId: 'funk-e24ed' })

  const newUserConfig: UserConfig = {
    id: user.uid,
    displayName: user.displayName,
  }
  const newCart: Cart = {
    // Exclude `type` to save space.
    products: []
  }

  return Promise.all([
    firestore.collection('user-configs').doc(user.uid).set(newUserConfig),
    firestore.collection('carts').doc(user.uid).set(newCart),
  ])
})
