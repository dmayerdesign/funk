# Developer notes

## Cost optimization

- **Billing: Configure a spending limit and budget alerts.**
- **Reads: always multicast** when creating an Observable of a Firestore read.
- **Reads: [use aggregation](https://firebase.google.com/docs/firestore/solutions/aggregation)**
- **Reads: [use cursors](https://firebase.google.com/docs/firestore/query-data/query-cursors) for pagination.**
- **Reads: fetch once per session** when you can, e.g. for data that can be considered part
of the "current version" of the app, like organization-level data that doesn't get updated much.
- **Reads and writes: always use either [transactions or batching](https://firebase.google.com/docs/firestore/manage-data/transactions).**
Transactions are the most generally useful, but batches should be used when deleting, or
for similarly aggressive operations that we're able to "fire and forget".
- Resources:
  - https://angularfirebase.com/lessons/managing-firebase-costs

### Example multicast
```ts
public itemOne$ = firestore.doc<Item>('items/1')
  .valueChanges()
  .pipe(shareReplay(1))
```

### Example aggregation function for listing docs in a collection
```ts
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.firestore()

exports.aggregate = functions.firestore
  .document('donations/{donationId}')
  .onCreate(async (snapshot, context) => {
    const donation = snapshot.data()
    const aggRef = db.doc('aggregation/donations')
    const aggDoc = await aggRef.get()
    const aggData = aggDoc.data()

    // Aggregate New Data
    return aggRef.set({
        total: aggData.total + donation.amount,
        count: aggData.count + 1,
        last25: [donation, ...aggData.last25.slice(0, 24)]
    })
  })
```

## Performance

- **Pre-rendering:** Make sure `AppShellComponent` contains a nice, one-page static
facade for the site.

This change is to test the search API.
