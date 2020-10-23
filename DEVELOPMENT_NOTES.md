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

<dl>
  <dt><b>api/core</b></dt>
  <dd>Core server-side logic.</dd>
  <br>
  <dt><b>api/functions</b></dt>
  <dd>Code that exposes the public API.</dd>
  <br>
  <dt><b>api/plugins</b></dt>
  <dd>Server-side logic that imports third-party code.</dd>
  <br>
  <dt><b>build-pipeline</b></dt>
  <dd>Code for building and deploying the project.</dd>
  <br>
  <dt><b>configuration</b></dt>
  <dd>Project-level configuration.</dd>
  <br>
  <dt><b>features</b></dt>
  <dd>Highest-level test cases (written in <a href="https://cucumber.io/docs/gherkin/reference" target="_blank" rel="noopener noreferrer">Gherkin</a>).</dd>
  <br>
  <dt><b>helpers</b></dt>
  <dd>General-purpose utilities and language extensions.</dd>
  <br>
  <dt><b>model</b></dt>
  <dd>The core, functional domain model: data structures and dependency-less logic.</dd>
  <br>
  <dt><b>test</b></dt>
  <dd>Test configuration.</dd>
  <br>
  <dt><b>ui/app</b></dt>
  <dd>Code that exposes the user interface.</dd>
  <br>
  <dt><b>ui/core</b></dt>
  <dd>Core user interface logic.</dd>
  <br>
  <dt><b>ui/functions</b></dt>
  <dd>Code that consumes the public API.</dd>
  <br>
  <dt><b>ui/plugins</b></dt>
  <dd>User interface logic that imports third-party code.</dd>
  <br>
</dl>
