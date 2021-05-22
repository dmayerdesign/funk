export default function () {
  cy.get(".post").each((jqPost) => {
    cy.wrap(jqPost.find(".post-title").text()).should("have.length.at.least", 1)
    // cy.wrap(jqPost.find(".post-cover-image").attr("src")).should(
    //   "have.length.at.least",
    //   1,
    // )
  })
}
