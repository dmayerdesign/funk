// TODO: Don't depend directly on Firebase.
import { firestore } from 'firebase-admin'

export declare function store(): firestore.Firestore
