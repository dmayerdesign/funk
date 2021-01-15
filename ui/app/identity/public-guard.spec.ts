import { RouterStateSnapshot, UrlTree } from "@angular/router"
import { asPromise } from "@funk/helpers/as-promise"
import { UserRole } from "@funk/model/auth/user-role"
import { AnonymousGuard } from "@funk/ui/app/identity/anonymous-guard"
import { PublicGuard } from "@funk/ui/app/identity/public-guard"
import {
  createRouterStub,
  createStubbedPublicGuard,
  createUserSession,
} from "@funk/ui/core/identity/stubs"
import { of } from "rxjs"

describe("PublicGuard", () => {
  let anonymousGuard: AnonymousGuard
  const activatedRoute: any = {}
  let routerState: RouterStateSnapshot

  beforeEach(() => {
    anonymousGuard = ({
      canActivate: jest.fn().mockReturnValue(of(true)),
    } as Partial<AnonymousGuard>) as AnonymousGuard
    routerState = { url: "go-to-url" } as RouterStateSnapshot
  })

  it("must first guard against an ANONYMOUS user", async function () {
    const anonymousGuardCanActivate = new UrlTree()
    anonymousGuard.canActivate = jest
      .fn()
      .mockReturnValue(of(anonymousGuardCanActivate))
    const guard = new PublicGuard(
      createUserSession(UserRole.ANONYMOUS),
      anonymousGuard,
      createRouterStub(),
    )
    const canActivate = await asPromise(
      guard.canActivate(activatedRoute, routerState),
    )

    expect(anonymousGuard.canActivate).toHaveBeenCalled()
    expect(canActivate).toBe(anonymousGuardCanActivate)
  })

  it("must activate if the user is SUPER", async function () {
    const canActivate = await asPromise(
      createStubbedPublicGuard(UserRole.SUPER).canActivate(
        activatedRoute,
        routerState,
      ),
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is OWNER", async function () {
    const canActivate = await asPromise(
      createStubbedPublicGuard(UserRole.OWNER).canActivate(
        activatedRoute,
        routerState,
      ),
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is ADMINISTRATOR", async function () {
    const canActivate = await asPromise(
      createStubbedPublicGuard(UserRole.ADMINISTRATOR).canActivate(
        activatedRoute,
        routerState,
      ),
    )

    expect(canActivate).toBe(true)
  })

  it("must not activate if the user is PUBLIC", async function () {
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.callThrough()

    const guard = new PublicGuard(
      createUserSession(UserRole.PUBLIC),
      anonymousGuard,
      routerStub,
    )
    const canActivate = await asPromise(
      guard.canActivate(activatedRoute, routerState),
    )

    expect(canActivate).toEqual(new UrlTree())
    expect(routerStub.parseUrl).toHaveBeenCalledTimes(1)
  })

  it("must not activate if the user is ANONYMOUS", async function () {
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.callThrough()

    const guard = new PublicGuard(
      createUserSession(UserRole.ANONYMOUS),
      anonymousGuard,
      routerStub,
    )
    const canActivate = await asPromise(
      guard.canActivate(activatedRoute, routerState),
    )

    expect(canActivate).toEqual(new UrlTree())
    expect(routerStub.parseUrl).toHaveBeenCalledTimes(1)
  })
})
