import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import { construct } from "@funk/commerce/customer/application/internal/behaviors/handle-create"
import { ORDERS } from "@funk/commerce/order/domain/order"

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
