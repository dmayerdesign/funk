import { DEFAULT_PAGINATION } from "@funk/persistence/model/pagination"
import {
  construct,
  GetTermBySlug,
} from "@funk/taxonomy/application/internal/behaviors/get-term-by-slug"
import { createFakeTaxonomyTerm } from "@funk/taxonomy/model/stubs"
import { List as ListTerm } from "./persistence/list-term"

describe("getTermBySlug", () => {
  const FAKE_TAXONOMY_TERM = createFakeTaxonomyTerm({
    id: "fake taxonomy term",
    taxonomyId: "fake taxonomy",
  })
  let listTaxonomyTerms: ListTerm
  let getTermBySlug: GetTermBySlug

  beforeEach(() => {
    listTaxonomyTerms = jest.fn().mockResolvedValue([FAKE_TAXONOMY_TERM])
    getTermBySlug = construct(listTaxonomyTerms)
  })

  it("should get a taxonomy term by slug", async () => {
    const taxonomyTerm = await getTermBySlug(FAKE_TAXONOMY_TERM.slug)

    expect(taxonomyTerm).toEqual(FAKE_TAXONOMY_TERM)
    expect(listTaxonomyTerms).toHaveBeenCalledWith({
      pagination: DEFAULT_PAGINATION,
      conditions: [["slug", "==", FAKE_TAXONOMY_TERM.slug]],
    })
  })
})
