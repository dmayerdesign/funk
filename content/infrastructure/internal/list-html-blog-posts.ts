import listHtmlBlogPosts from "@funk/content/application/internal/behaviors/list-html-blog-posts"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import mapRequestToBody from "@funk/http/plugins/internal/cloud-function/behaviors/map-request-to-body"

export default createRpcFunction(mapRequestToBody(listHtmlBlogPosts))
