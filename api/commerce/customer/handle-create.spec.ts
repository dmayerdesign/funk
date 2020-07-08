import { construct } from "@funk/api/commerce/customer/handle-create"
import { ORDERS } from "@funk/model/commerce/order/order"
import { UserRecord } from "@funk/api/plugins/auth/user-record"

describe("customerHandleCreate", () =>
{
  it("should create a cart when any user is created", async () =>
  {
    const USER = { uid: "user uid" } as UserRecord
    const setById = jasmine.createSpy()
    const handleCreate = construct(setById)

    await handleCreate(USER)

    expect(setById).toHaveBeenCalledWith(
      ORDERS,
      expect.any(String),
      expect.objectContaining({
        customer: expect.objectContaining({
          userId: USER.uid,
        }),
      }))
  })
})
