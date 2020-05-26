import { construct } from "@funk/api/commerce/customer/handle-create"
import { ORDERS } from "@funk/model/commerce/order/order"
import { UserRecord } from "@funk/plugins/auth/user-record"

describe("customerHandleCreate", () =>
{
  it("should create a cart when a user account is created", async (done) =>
  {
    const USER = { uid: "user uid", email: "user email" } as UserRecord
    const setById = jasmine.createSpy()
    const handleCreate = construct({ setById })

    await handleCreate(USER)

    expect(setById).toHaveBeenCalledWith(
      ORDERS,
      expect.any(String),
      expect.objectContaining({
        customer: expect.objectContaining({
          userId: USER.uid,
        }),
      }))
    done()
  })

  it("should NOT create a cart when an anonymous user is created", async (done) =>
  {
    const USER = { uid: "user uid" } as UserRecord
    const setById = jasmine.createSpy()
    const handleCreate = construct({ setById })

    await handleCreate(USER)

    expect(setById).not.toHaveBeenCalled()
    done()
  })
})
