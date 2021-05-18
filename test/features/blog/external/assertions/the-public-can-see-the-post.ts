export default function (postTaxonomyTermSlug: string, testPostBody: string) {
  // FIXME: Need an assertion here that can somehow survive the window reloading, which is
  // currently the only way to switch users. Also, data is currently only stored in-memory. Fixing
  // this might require using either a real database or a fake one that persists for the life of
  // a scenario.
  cy.url().should("contain", postTaxonomyTermSlug)
}
