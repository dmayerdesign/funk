import { Mutation } from '@funk/model/audit/mutation'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import { firestore as db } from 'firebase-admin'
import { firestore } from 'firebase-functions'
const { diff } = require('diff-json')

export default firestore.document('products/{id}').onWrite(
  async (change, { params }) =>
  {
    const { id } = params
    const timestamp = Date.now()
    const timestampId = `${timestamp}-${Math.random().toString(16).substring(2)}`
    const beforeData = change.before.data()
    const afterData = change.after.data()
    const changes = diff(
      beforeData,
      afterData,
    )
    if (changes.length)
    {
      const mutation: DbDocumentInput<Mutation> = {
        existingDocumentId: id,
        createdAt: timestamp,
        changes,
      }
      await db()
        .doc(`audit-products/${timestampId}`)
        .set(mutation)
    }
  })
