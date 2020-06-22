import ignoringKeys from "./ignoring-keys"
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore"
import { ChangeContext } from "@funk/plugins/persistence/change"

describe("ignoringKeys", () =>
{
  it("should ignore the change if one of the provided keys has changed", () =>
  {
    const handler = jest.fn()
    const returnedHandler = ignoringKeys([ "id", "updatedAt" ], handler)
    const now = Date.now()

    returnedHandler({
      before: { data: () => ({ updatedAt: now }) } as unknown as DocumentSnapshot,
      after: { data: () => ({ updatedAt: now + 100 }) } as unknown as DocumentSnapshot,
    }, {} as ChangeContext)

    expect(handler).not.toHaveBeenCalled()
  })

  it("should process the change if NONE of the provided keys has changed", () =>
  {
    const handler = jest.fn()
    const returnedHandler = ignoringKeys([ "id", "updatedAt" ], handler)
    const now = Date.now()
    const change = {
      before: { data: () => ({ updatedAt: now, id: "same id" }) } as unknown as DocumentSnapshot,
      after: { data: () => ({ updatedAt: now, id: "same id" }) } as unknown as DocumentSnapshot,
    }
    const ctx = {} as ChangeContext

    returnedHandler(change, ctx)

    expect(handler).toHaveBeenCalled()
  })
})
