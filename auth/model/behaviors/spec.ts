import getVerifiedRole from "@funk/auth/model/behaviors/get-verified-role"
import { CustomClaims } from "@funk/auth/model/custom-claims"
import { UserRole } from "@funk/auth/model/user-role"

describe("getVerifiedRole", () => {
  it("should get the user role if their email is verified", () => {
    const role = getVerifiedRole(
      { emailVerified: true },
      { role: UserRole.ADMINISTRATOR },
    )
    expect(role).toBe(UserRole.ADMINISTRATOR)
  })
  it("should get ANONYMOUS if their email is not verified", () => {
    const role = getVerifiedRole(
      { emailVerified: false },
      { role: UserRole.ADMINISTRATOR },
    )
    expect(role).toBe(UserRole.ANONYMOUS)
  })
  it("should get ANONYMOUS if no role is provided", () => {
    const role = getVerifiedRole({ emailVerified: true }, {} as CustomClaims)
    expect(role).toBe(UserRole.ANONYMOUS)
  })
})
