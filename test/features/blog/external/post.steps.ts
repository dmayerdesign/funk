import { UserRole } from "@funk/auth/model/user-role"
import thePostMustHaveBeenSaved from "@funk/test/features/blog/external/assertions/the-post-must-have-been-saved"
import thePublicMustBeAbleToSeeThePost from "@funk/test/features/blog/external/assertions/the-public-must-be-able-to-see-the-post"
import beginToWriteAPost from "@funk/test/features/blog/external/behaviors/begin-to-write-a-post"
import closePostEditorDrawer from "@funk/test/features/blog/external/behaviors/close-post-editor-drawer"
import openPostAdderDrawer from "@funk/test/features/blog/external/behaviors/open-post-adder-drawer"
import publishThePost from "@funk/test/features/blog/external/behaviors/publish-the-post"
import visitPostCategoryPage from "@funk/test/features/blog/external/behaviors/visit-post-category-page"
import {
  configureBlogPostsPage,
  tearDownBlogPostsPage,
  TEST_USER_ADMIN_ID,
} from "@funk/test/features/blog/external/helpers"
import { example, rule } from "@funk/test/helpers/external/helpers"
import everyPostHasATitleAndCoverImage from "./assertions/every-post-has-a-title-and-cover-image"
import thePublicMustNotBeAbleToSeeThePost from "./assertions/the-public-must-not-be-able-to-see-the-post"
import theUserCanEditAPost from "./assertions/the-user-can-edit-a-post"
import theUserGetsAllBlogPostsInCategory from "./assertions/the-user-gets-all-blog-posts-in-category"
import editAPost from "./behaviors/edit-a-post"
import removeAPost from "./behaviors/remove-a-post"

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
    openPostAdderDrawer()
  })

  after(() => tearDownBlogPostsPage())

  example("Paul starts writing a blog post.", () => {
    // When Paul begins to write a blog post
    // Bug in Cypress causes typing to overlap across multiple elements, so just using the body
    // input for now.
    const testPostBody = "Hello!"
    beginToWriteAPost({ body: testPostBody })
    closePostEditorDrawer()
    // Then the blog post is saved
    thePostMustHaveBeenSaved({ bodySearch: testPostBody })
  })
})

rule("An admin can publish a blog post.", () => {
  let paulsPostTitle: string
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
    paulsPostTitle = "fake post title"
    paulsPostBody = "fake post body"
    openPostAdderDrawer()
    beginToWriteAPost({ body: paulsPostBody, title: paulsPostTitle })
  })

  after(() => tearDownBlogPostsPage())

  example("Paul publishes a blog post.", () => {
    // When Paul intends to publish the blog post
    publishThePost()
    // Then the general public can see the blog post
    thePublicMustBeAbleToSeeThePost("blog-posts", paulsPostTitle)
  })
})

rule("An admin can edit a blog post.", () => {
  const bodyAddition = "fake addition to post"

  before("Paul intends to edit a blog post.", () => {
    // Given an admin named Paul
    // And there is a blog post for the post category page "blog-posts"
    // When Paul visits the post category page "blog-posts"
    configureBlogPostsPage()
    visitPostCategoryPage(
      "blog-posts",
      TEST_USER_ADMIN_ID,
      UserRole.ADMINISTRATOR,
    )
    // Then Paul is able to edit a post
    theUserCanEditAPost()
  })

  after(() => tearDownBlogPostsPage())

  example("Paul starts editing a blog post.", () => {
    // When Paul begins to edit a blog post
    editAPost({ bodyAddition })
    closePostEditorDrawer()
    // Then the edited blog post is saved
    thePostMustHaveBeenSaved({
      bodySearch: bodyAddition,
    })
  })
})

rule("An admin can remove a blog post.", () => {
  before(() => {
    // Given an admin named Paul
    // And there is a blog post for the post category page "blog-posts"
    configureBlogPostsPage()
    visitPostCategoryPage(
      "blog-posts",
      TEST_USER_ADMIN_ID,
      UserRole.ADMINISTRATOR,
    )
  })

  after(() => tearDownBlogPostsPage())

  example("Paul removes a published blog post.", () => {
    // When Paul intends to remove the post
    removeAPost("Test Blog Post 1")
    // Then the post is removed from all users' view
    thePublicMustNotBeAbleToSeeThePost("blog-posts", "Test Blog Post 1")
    // And the post is moved to the trash
  })
})

rule.skip("An anonymous user can view published posts by category.", () => {
  before(() => {
    // Given a user named Amy
    // And that there are blog posts in the category "blog-posts"
    // And some blog posts in the category "blog-posts" are in the trash
    configureBlogPostsPage()
    // When Amy requests all blog posts in the category "blog-posts"
    visitPostCategoryPage("blog-posts", TEST_USER_ADMIN_ID, UserRole.ANONYMOUS)
  })

  after(() => tearDownBlogPostsPage())

  example(`Amy visits the default category page ("blog-posts").`, () => {
    // Then Amy gets all blog posts in the category "blog-posts"
    // And none of the blog posts are in the trash
    theUserGetsAllBlogPostsInCategory("blog-posts")
    // And each blog post is represented by its title and its cover image
    everyPostHasATitleAndCoverImage()
  })
})
