import { RouterStateSnapshot, UrlTree } from "@angular/router"
import { asPromise } from "@funk/helpers/as-promise"
import { UserRole } from "@funk/model/auth/user-role"
import { AnonymousGuard } from "@funk/ui/app/identity/anonymous-guard"
import {
  createRouterStub,
  createUserSession,
} from "@funk/ui/core/identity/stubs"

describe("AnonymousGuard", () => {
  const activatedRoute: any = {}
  let routerState: RouterStateSnapshot

  beforeEach(() => {
    routerState = { url: "go-to-url" } as RouterStateSnapshot
  })

  it("must activate if the user is SUPER", async function () {
    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.SUPER),
        createRouterStub()
      ).canActivate(activatedRoute, routerState)
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is OWNER", async function () {
    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.OWNER),
        createRouterStub()
      ).canActivate(activatedRoute, routerState)
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is ADMINISTRATOR", async function () {
    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.ADMINISTRATOR),
        createRouterStub()
      ).canActivate(activatedRoute, routerState)
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is PUBLIC", async function () {
    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.PUBLIC),
        createRouterStub()
      ).canActivate(activatedRoute, routerState)
    )

    expect(canActivate).toBe(true)
  })

  it("must NOT activate if the user is ANONYMOUS", async function () {
    const URL_TREE = new UrlTree()
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.returnValue(URL_TREE)

    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.ANONYMOUS),
        routerStub
      ).canActivate(activatedRoute, routerState)
    )

    expect(canActivate).toBe(URL_TREE)
    expect(routerStub.parseUrl).toHaveBeenCalledWith(
      expect.stringContaining("=go-to-url")
    )
  })
})
