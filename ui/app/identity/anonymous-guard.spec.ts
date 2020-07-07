import { UrlTree } from "@angular/router"
import { asPromise } from "@funk/helpers/as-promise"
import { UserRole } from "@funk/model/auth/user-role"
import { AnonymousGuard } from "@funk/ui/app/identity/anonymous-guard"
import { createRouterStub, createUserSession } from "@funk/ui/core/identity/stubs"

describe("AnonymousGuard", () =>
{
  it("must activate if the user is SUPER", async () =>
  {
    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.SUPER),
      createRouterStub())
      .canActivate())

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is OWNER", async () =>
  {
    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.OWNER),
      createRouterStub())
      .canActivate())

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is ADMINISTRATOR", async () =>
  {
    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.ADMINISTRATOR),
      createRouterStub())
      .canActivate())

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is PUBLIC", async () =>
  {
    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.PUBLIC),
      createRouterStub())
      .canActivate())

    expect(canActivate).toBe(true)
  })

  it("must NOT activate if the user is ANONYMOUS", async () =>
  {
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.callThrough()

    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.ANONYMOUS),
      routerStub)
      .canActivate())

    expect(canActivate).toEqual(new UrlTree())
    expect(routerStub.parseUrl).toHaveBeenCalledTimes(1)
  })
})
