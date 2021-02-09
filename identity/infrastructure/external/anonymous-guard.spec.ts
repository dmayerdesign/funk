import { RouterStateSnapshot, UrlTree } from "@angular/router"
import { UserRole } from "@funk/auth/model/user-role"
import { asPromise } from "@funk/helpers/as-promise"
import {
    createRouterStub,
    createUserSession
} from "@funk/identity/application/external/stubs"
import { AnonymousGuard } from "@funk/identity/infrastructure/external/anonymous-guard"

describe("AnonymousGuard", () => {
  const activatedRoute: any = {}
  let routerState: RouterStateSnapshot

  beforeEach(() => {
    routerState = { url: "go-to-url" } as RouterStateSnapshot
  })

  it("must activate if the user is SUPER", async () => {
    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.SUPER),
        createRouterStub(),
      ).canActivate(activatedRoute, routerState),
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is OWNER", async () => {
    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.OWNER),
        createRouterStub(),
      ).canActivate(activatedRoute, routerState),
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is ADMINISTRATOR", async () => {
    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.ADMINISTRATOR),
        createRouterStub(),
      ).canActivate(activatedRoute, routerState),
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is PUBLIC", async () => {
    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.PUBLIC),
        createRouterStub(),
      ).canActivate(activatedRoute, routerState),
    )

    expect(canActivate).toBe(true)
  })

  it("must NOT activate if the user is ANONYMOUS", async () => {
    const URL_TREE = new UrlTree()
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.returnValue(URL_TREE)

    const canActivate = await asPromise(
      new AnonymousGuard(
        createUserSession(UserRole.ANONYMOUS),
        routerStub,
      ).canActivate(activatedRoute, routerState),
    )

    expect(canActivate).toBe(URL_TREE)
    expect(routerStub.parseUrl).toHaveBeenCalledWith(
      expect.stringContaining("=go-to-url"),
    )
  })
})
