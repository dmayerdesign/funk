import onlyKeys from "./only-keys"
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore"
import { ChangeContext } from "@funk/api/plugins/persistence/change"

describe("onlyKeys", () => {
  it("should process the change if one of the provided keys has changed", () => {
    const handler = jest.fn()
    const returnedHandler = onlyKeys(["id", "updatedAt"], handler)
    const now = Date.now()

    returnedHandler(
      {
        before: ({
          data: () => ({ updatedAt: now }),
        } as unknown) as DocumentSnapshot,
        after: ({
          data: () => ({ updatedAt: now + 100 }),
        } as unknown) as DocumentSnapshot,
      },
      {} as ChangeContext
    )

    expect(handler).toHaveBeenCalled()
  })

  it("should ignore the change if NONE of the provided keys has changed", () => {
    const handler = jest.fn()
    const returnedHandler = onlyKeys(["id", "updatedAt"], handler)
    const now = Date.now()
    const change = {
      before: ({
        data: () => ({ updatedAt: now, id: "same id" }),
      } as unknown) as DocumentSnapshot,
      after: ({
        data: () => ({ updatedAt: now, id: "same id" }),
      } as unknown) as DocumentSnapshot,
    }
    const ctx = {} as ChangeContext

    returnedHandler(change, ctx)

    expect(handler).not.toHaveBeenCalled()
  })
})
