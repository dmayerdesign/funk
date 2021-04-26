import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import { construct } from "@funk/commerce/customer/application/internal/behaviors/handle-create"

describe("customerHandleCreate", () => {
  it("should create a cart when any user is created", async () => {
    const USER = { uid: "test-user-basic" } as UserRecord
    const setOrderById = jest.fn()
    const handleCreate = construct(setOrderById)

    await handleCreate(USER)

    expect(setOrderById).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        customer: expect.objectContaining({
          userId: USER.uid,
        }),
      }),
    )
  })
})
