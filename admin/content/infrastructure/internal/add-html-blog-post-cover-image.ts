import addHtmlBlogPostCoverImage from "@funk/admin/content/application/internal/behaviors/add-html-blog-post-cover-image"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import mapRequestToBody from "@funk/http/plugins/internal/cloud-function/behaviors/map-request-to-body"

export default createRpcFunction(mapRequestToBody(addHtmlBlogPostCoverImage))
