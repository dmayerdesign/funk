import roleHasAdminPrivilegeOrGreater from "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { UserRole } from "@funk/model/auth/user-role"

describe("roleHasAdminPrivilegeOrGreater", () => {
  it("should return true if the user has the role ADMINISTRATOR", () =>
    expect(roleHasAdminPrivilegeOrGreater(UserRole.ADMINISTRATOR)).toBe(true))
  it("should return true if the user has the role OWNER", () =>
    expect(roleHasAdminPrivilegeOrGreater(UserRole.OWNER)).toBe(true))
  it("should return true if the user has the role SUPER", () =>
    expect(roleHasAdminPrivilegeOrGreater(UserRole.SUPER)).toBe(true))
  it("should return false if the user has the role PUBLIC", () =>
    expect(roleHasAdminPrivilegeOrGreater(UserRole.PUBLIC)).toBe(false))
  it("should return false if the user has the role ANONYMOUS", () =>
    expect(roleHasAdminPrivilegeOrGreater(UserRole.ANONYMOUS)).toBe(false))
})
