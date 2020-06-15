import { UrlTree } from "@angular/router"
import { UserRole } from "@funk/model/auth/user-role"
import { AdministratorGuard } from "@funk/ui/app/identity/administrator-guard"
import {
  createRouterStub,
  createStubbedAdministratorGuard,
  createUserSession,
} from "@funk/ui/core/identity/stubs"
import { first } from "rxjs/operators"

describe("AdministratorGuard", () =>
{
  it("must activate if the user is SUPER", async (done) =>
  {
    const canActivate = await createStubbedAdministratorGuard(UserRole.SUPER)
      .canActivate().pipe(first()).toPromise()

    expect(canActivate).toBe(true)
    done()
  })

  it("must activate if the user is OWNER", async (done) =>
  {
    const canActivate = await createStubbedAdministratorGuard(UserRole.OWNER)
      .canActivate().pipe(first()).toPromise()

    expect(canActivate).toBe(true)
    done()
  })

  it("must activate if the user is ADMINISTRATOR", async (done) =>
  {
    const canActivate = await createStubbedAdministratorGuard(UserRole.ADMINISTRATOR)
      .canActivate().pipe(first()).toPromise()

    expect(canActivate).toBe(true)
    done()
  })

  it("must not activate if the user is PUBLIC", async (done) =>
  {
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.callThrough()

    const guard = new AdministratorGuard(
      createUserSession(UserRole.PUBLIC),
      routerStub
    )
    const canActivate = await guard.canActivate().pipe(first()).toPromise()

    expect(canActivate).toEqual(new UrlTree())
    expect(routerStub.parseUrl).toHaveBeenCalledTimes(1)
    done()
  })

  it("must not activate if the user is ANONYMOUS", async (done) =>
  {
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.callThrough()

    const guard = new AdministratorGuard(
      createUserSession(UserRole.ANONYMOUS),
      routerStub
    )
    const canActivate = await guard.canActivate().pipe(first()).toPromise()

    expect(canActivate).toEqual(new UrlTree())
    expect(routerStub.parseUrl).toHaveBeenCalledTimes(1)
    done()
  })
})