import { construct } from "@funk/api/core/commerce/customer/handle-create"
import { UserRecord } from "@funk/api/plugins/auth/user-record"
import { ORDERS } from "@funk/model/commerce/order/order"

describe("customerHandleCreate", () => {
  it("should create a cart when any user is created", async function () {
    const USER = { uid: "test-user-basic" } as UserRecord
    const setById = jest.fn()
    const handleCreate = construct(setById)

    await handleCreate(USER)

    expect(setById).toHaveBeenCalledWith(
      ORDERS,
      expect.any(String),
      expect.objectContaining({
        customer: expect.objectContaining({
          userId: USER.uid,
        }),
      }),
    )
  })
})
