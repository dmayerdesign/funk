import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"
import getTaxonomyTermBySlug from "@funk/taxonomy/application/internal/behaviors/get-term-by-slug"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"

export default createRpcFunction(
  async ({
    body,
  }: RequestWithBody<string | null | undefined>): Promise<TaxonomyTerm> =>
    await getTaxonomyTermBySlug(body),
)
