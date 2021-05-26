import { ImageGroup } from "@funk/admin/image-group/model/image-group"
import { ADD_HTML_BLOG_POST_COVER_IMAGE } from "@funk/blog/infrastructure/external/tokens"
import { FUNCTIONS_BASE_URL } from "@funk/configuration"
import { createFakeImageGroup } from "@funk/image/model/stubs"
import editAPost from "@funk/test/features/blog/external/behaviors/edit-a-post"
import publishThePost from "@funk/test/features/blog/external/behaviors/publish-the-post"

export default function (): ImageGroup {
  const PATH_TO_COVER_IMG_FILE_FIXTURE = "blog-post-editor-cover-image.jpg"
  const FAKE_COVER_IMAGE_GROUP = createFakeImageGroup()
  cy.intercept(
    `${FUNCTIONS_BASE_URL}/${ADD_HTML_BLOG_POST_COVER_IMAGE}`,
    FAKE_COVER_IMAGE_GROUP,
  )
  editAPost({ bodyAddition: "fake body" })
  cy.get("#blog-post-editor-cover-image-input").attachFile(
    PATH_TO_COVER_IMG_FILE_FIXTURE,
  )
  cy.get("#blog-post-editor-cover-image-preview").should("have.attr", "src")

  publishThePost()

  return FAKE_COVER_IMAGE_GROUP
}
