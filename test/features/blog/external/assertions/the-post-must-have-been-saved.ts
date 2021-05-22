import { ContentHtmlBlogPost } from "@funk/admin/content/model/content"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import { values } from "lodash"
import { theSavedContentsShouldMatch } from "../helpers"

export default function ({
  bodySearch,
  titleSearch,
}: {
  bodySearch?: string
  titleSearch?: string
}) {
  if (!bodySearch && !titleSearch) {
    throw new InvalidInputError(
      "This assertion needs at least one of `body` and `title`.",
    )
  }

  theSavedContentsShouldMatch<ContentHtmlBlogPost>((contents) => {
    if (bodySearch && !titleSearch) {
      const savedPost = values(contents).some((content) =>
        content.value.match(new RegExp(bodySearch, "gi")),
      )
      return savedPost !== undefined
    }
    if (!bodySearch && titleSearch) {
      const savedPost = values(contents).some((content) =>
        content.title.match(new RegExp(titleSearch, "gi")),
      )
      return savedPost !== undefined
    }
    if (bodySearch && titleSearch) {
      const savedPost = values(contents).some(
        (content) =>
          content.title.match(new RegExp(titleSearch, "gi")) &&
          content.value.match(new RegExp(bodySearch, "gi")),
      )
      return savedPost !== undefined
    }
    return false
  })
}
