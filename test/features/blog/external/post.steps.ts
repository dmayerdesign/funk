import { UserRole } from "@funk/auth/model/user-role"
import thePostIsSaved from "@funk/test/features/blog/external/assertions/the-post-is-saved"
import thePublicCanSeeThePost from "@funk/test/features/blog/external/assertions/the-public-can-see-the-post"
import beginToWriteAPost from "@funk/test/features/blog/external/behaviors/begin-to-write-a-post"
import closePostEditorDrawer from "@funk/test/features/blog/external/behaviors/close-post-editor-drawer"
import openPostEditorDrawer from "@funk/test/features/blog/external/behaviors/open-post-editor-drawer"
import publishThePost from "@funk/test/features/blog/external/behaviors/publish-the-post"
import visitPostCategoryPage from "@funk/test/features/blog/external/behaviors/visit-post-category-page"
import {
  configureBlogPostsPage,
  TEST_USER_ADMIN_ID,
} from "@funk/test/features/blog/external/helpers"
import { example, rule } from "@funk/test/helpers/external/helpers"

rule("An admin can write a blog post.", () => {
  before("Paul intends to add a blog post.", () => {
    // Given an admin named Paul
    // When Paul visits the post category page "blog-posts"
    configureBlogPostsPage()
    visitPostCategoryPage(
      "blog-posts",
      TEST_USER_ADMIN_ID,
      UserRole.ADMINISTRATOR,
    )
    // Then Paul is able to add a post
    openPostEditorDrawer()
  })

  example("Paul starts writing a blog post.", () => {
    // When Paul begins to write a blog post
    // Bug in Cypress causes typing to overlap across multiple elements, so just using the body
    // input for now.
    const testPostBody = "Hello!"
    beginToWriteAPost(testPostBody)
    closePostEditorDrawer()
    // Then the blog post is saved
    thePostIsSaved(testPostBody)
  })
})

rule("An admin can publish a blog post.", () => {
  let paulsPostBody: string

  before(() => {
    // Given an admin named Paul
    configureBlogPostsPage()
    visitPostCategoryPage(
      "blog-posts",
      TEST_USER_ADMIN_ID,
      UserRole.ADMINISTRATOR,
    )
    // And that Paul has written a blog post
    paulsPostBody = "fake post body"
    openPostEditorDrawer()
    beginToWriteAPost(paulsPostBody)
  })

  example("Paul publishes a blog post.", () => {
    // When Paul intends to publish the blog post
    publishThePost()
    // Then the general public can see the blog post
    thePublicCanSeeThePost("blog-posts", paulsPostBody)
  })
})
