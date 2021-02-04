# Development notes

## Firestore cost optimization

- **Billing: Configure a spending limit and budget alerts.**
- **Reads: always multicast** when creating an Observable of a Firestore read.
- **Reads: [use aggregation](https://firebase.google.com/docs/firestore/solutions/aggregation)**
- **Reads: [use cursors](https://firebase.google.com/docs/firestore/query-data/query-cursors) for pagination.**
- **Reads: fetch once per session** when you can, e.g. for data that can be considered
  part of the "current version" of the app, like organization-level data that doesn't get
  updated much.
- **Batch reads and writes: always use either [transactions or batching](https://firebase.google.com/docs/firestore/manage-data/transactions).**
  Transactions are the most generally useful, but batches should be used when deleting, or
  for similarly aggressive operations that we're able to "fire and forget".
- Resources:
  - https://angularfirebase.com/lessons/managing-firebase-costs

### Example multicast

```ts
public itemOne$ = firestore.doc<Item>('items/1')
  .valueChanges()
  .pipe(shareReplay(1))
  // Without `shareReplay`, one producer (Firestore read) is created per call to `.subscribe()`.
  // `shareReplay` ensures that only one producer is ever created.
```

### Example aggregation function for listing docs in a collection

```ts
const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()
const db = admin.firestore()

exports.aggregate = functions.firestore
  .document("donations/{donationId}")
  .onCreate(async (snapshot, context) => {
    const donation = snapshot.data()
    const aggRef = db.doc("aggregation/donations")
    const aggDoc = await aggRef.get()
    const aggData = aggDoc.data()

    // Aggregate New Data
    return aggRef.set({
      total: aggData.total + donation.amount,
      count: aggData.count + 1,
      last25: [donation, ...aggData.last25.slice(0, 24)],
    })
  })
```

## Performance

- **Pre-rendering:** Make sure `AppShellComponent` contains a nice, one-page static facade
  for the site.

## Content Management

### Things that should be editable within a theme, in order of importance

- Core content like products
- Copy
- Banner images
- Theme
  - Colors
  - Fonts
  - Font sizes

## Structure

The folder structure of Funk roughly follows the principles of Domain Driven Design. Every domain
is separated into one or more of `model`, `application`, `plugins`, and `infrastructure`.

<dl>
  <dt><b>model</b></dt>
  <dd>A model of the problem domain with no external dependencies.</dd>
  <br>
  <dt><b>plugins</b></dt>
  <dd>Application code that imports third-party code.</dd>
  <br>
  <dt><b>application</b></dt>
  <dd>Code gluing together the model and the plugins.</dd>
  <br>
  <dt><b>infrastructure</b></dt>
  <dd>Platform-specific code that exposes the application.</dd>
  <br>
  <dt><b>*/internal</b></dt>
  <dd>Code that runs on organization-owned machines ("server-side").</dd>
  <br>
  <dt><b>*/external</b></dt>
  <dd>Code that runs on users' machines ("client-side").</dd>
  <br>
  <dt><b>*/helpers</b></dt>
  <dd>General-purpose utilities like convenience functions and language extensions.</dd>
  <br>
  <dt><b>*/behaviors</b></dt>
  <dd>Commands and queries.</dd>
  <br>
  <dt><b>*/validators</b></dt>
  <dd>Validation functions generated during the build (shouldn't be edited).</dd>
  <br>
</dl>
