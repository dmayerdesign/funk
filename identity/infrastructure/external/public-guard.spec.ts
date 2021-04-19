import { RouterStateSnapshot, UrlTree } from "@angular/router"
import { UserRole } from "@funk/auth/model/user-role"
import { asPromise } from "@funk/helpers/as-promise"
import {
  createRouterStub,
  createStubbedPublicGuard,
  createUserSession,
} from "@funk/identity/application/external/stubs"
import { AnonymousGuard } from "@funk/identity/infrastructure/external/anonymous-guard"
import { PublicGuard } from "@funk/identity/infrastructure/external/public-guard"
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

  it("must first guard against an ANONYMOUS user", async () => {
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

  it("must activate if the user is SUPER", async () => {
    const canActivate = await asPromise(
      createStubbedPublicGuard(UserRole.SUPER).canActivate(
        activatedRoute,
        routerState,
      ),
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is OWNER", async () => {
    const canActivate = await asPromise(
      createStubbedPublicGuard(UserRole.OWNER).canActivate(
        activatedRoute,
        routerState,
      ),
    )

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is ADMINISTRATOR", async () => {
    const canActivate = await asPromise(
      createStubbedPublicGuard(UserRole.ADMINISTRATOR).canActivate(
        activatedRoute,
        routerState,
      ),
    )

    expect(canActivate).toBe(true)
  })

  it("must not activate if the user is PUBLIC", async () => {
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

  it("must not activate if the user is ANONYMOUS", async () => {
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
