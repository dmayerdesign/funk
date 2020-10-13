import firebase, { firestore } from "firebase-admin"

export const store: (app?: firebase.app.App) => firestore.Firestore = firestore
