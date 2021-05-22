import { Content, ContentHtmlBlogPost } from "@funk/admin/content/model/content"
import contents from "@funk/build-pipeline/data/development-data/contents.json"
import taxonomyTerms from "@funk/build-pipeline/data/development-data/taxonomy-terms.json"
import { reverse, sortBy, values } from "lodash"

export default function (categorySlug: string) {
  const categoryId = values(taxonomyTerms).find(
    (taxonomyTerm) => taxonomyTerm.slug === categorySlug,
  )?.id
  const firstFewExpectedBlogPostsInOrder = ((reverse(
    sortBy(
      values(contents).filter(
        (content) =>
          ((content as Content) as ContentHtmlBlogPost)?.taxonomyTerms?.includes(
            categoryId!,
          ) && content.removedAt == null,
      ),
      "createdAt",
    ),
  ) as Content[]) as ContentHtmlBlogPost[]).slice(0, 5)
  const firstFewPostsCount = firstFewExpectedBlogPostsInOrder.length

  cy.get(".post").should("have.length", firstFewPostsCount)
  cy.get(".post").each((post, index) => {
    const expectedContent = firstFewExpectedBlogPostsInOrder[index]
    cy.wrap(post)
      .get(".post-title")
      .should("contain.text", expectedContent.title)
  })
}
