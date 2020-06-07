import { UrlTree } from "@angular/router"
import { asPromise } from "@funk/helpers/as-promise"
import { UserRole } from "@funk/model/auth/user-role"
import { AnonymousGuard } from "@funk/ui/app/identity/anonymous-guard"
import { createRouterStub } from "@funk/ui/app/identity/stubs"
import UserSession from "@funk/ui/app/identity/user-session"
import { of } from "rxjs"

describe("AnonymousGuard", () =>
{
  const createUserSession = (role: UserRole) => of({ auth: { claims: { role } } }) as UserSession

  it("must activate if the user is SUPER", async (done) =>
  {
    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.SUPER),
      createRouterStub())
      .canActivate())

    expect(canActivate).toBe(true)
    done()
  })

  it("must activate if the user is OWNER", async (done) =>
  {
    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.OWNER),
      createRouterStub())
      .canActivate())

    expect(canActivate).toBe(true)
    done()
  })

  it("must activate if the user is ADMINISTRATOR", async (done) =>
  {
    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.ADMINISTRATOR),
      createRouterStub())
      .canActivate())

    expect(canActivate).toBe(true)
    done()
  })

  it("must activate if the user is PUBLIC", async (done) =>
  {
    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.PUBLIC),
      createRouterStub())
      .canActivate())

    expect(canActivate).toBe(true)
    done()
  })

  it("must NOT activate if the user is ANONYMOUS", async (done) =>
  {
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.callThrough()

    const canActivate = await asPromise(new AnonymousGuard(
      createUserSession(UserRole.ANONYMOUS),
      routerStub)
      .canActivate())

    expect(canActivate).toEqual(new UrlTree())
    expect(routerStub.parseUrl).toHaveBeenCalledTimes(1)
    done()
  })
})
