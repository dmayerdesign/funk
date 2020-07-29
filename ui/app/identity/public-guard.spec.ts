import { UrlTree, RouterStateSnapshot } from "@angular/router"
import { UserRole } from "@funk/model/auth/user-role"
import { AnonymousGuard } from "@funk/ui/app/identity/anonymous-guard"
import { PublicGuard } from "@funk/ui/app/identity/public-guard"
import {
  createRouterStub,
  createStubbedPublicGuard,
  createUserSession,
} from "@funk/ui/core/identity/stubs"
import { first } from "rxjs/operators"
import { of } from "rxjs"

describe("PublicGuard", () =>
{
  let anonymousGuard: AnonymousGuard
  const activatedRoute: any = {}
  let routerState: RouterStateSnapshot

  beforeEach(() =>
  {
    anonymousGuard = {
      canActivate: jest.fn().mockReturnValue(of(true)),
    } as Partial<AnonymousGuard> as AnonymousGuard
    routerState = { url: "go-to-url" } as RouterStateSnapshot
  })

  it("must first guard against an ANONYMOUS user", async () =>
  {
    const anonymousGuardCanActivate = new UrlTree()
    anonymousGuard.canActivate = jest.fn().mockReturnValue(of(anonymousGuardCanActivate))
    const guard = new PublicGuard(
      createUserSession(UserRole.ANONYMOUS),
      anonymousGuard,
      createRouterStub()
    )
    const canActivate = await guard.canActivate(activatedRoute, routerState)
      .pipe(first())
      .toPromise()

    expect(anonymousGuard.canActivate).toHaveBeenCalled()
    expect(canActivate).toBe(anonymousGuardCanActivate)
  })

  it("must activate if the user is SUPER", async () =>
  {
    const canActivate = await createStubbedPublicGuard(UserRole.SUPER)
      .canActivate(activatedRoute, routerState).pipe(first()).toPromise()

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is OWNER", async () =>
  {
    const canActivate = await createStubbedPublicGuard(UserRole.OWNER)
      .canActivate(activatedRoute, routerState).pipe(first()).toPromise()

    expect(canActivate).toBe(true)
  })

  it("must activate if the user is ADMINISTRATOR", async () =>
  {
    const canActivate = await createStubbedPublicGuard(UserRole.ADMINISTRATOR)
      .canActivate(activatedRoute, routerState).pipe(first()).toPromise()

    expect(canActivate).toBe(true)
  })

  it("must not activate if the user is PUBLIC", async () =>
  {
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.callThrough()

    const guard = new PublicGuard(
      createUserSession(UserRole.PUBLIC),
      anonymousGuard,
      routerStub
    )
    const canActivate = await guard.canActivate(activatedRoute, routerState)
      .pipe(first())
      .toPromise()

    expect(canActivate).toEqual(new UrlTree())
    expect(routerStub.parseUrl).toHaveBeenCalledTimes(1)
  })

  it("must not activate if the user is ANONYMOUS", async () =>
  {
    const routerStub = createRouterStub()
    spyOn(routerStub, "parseUrl").and.callThrough()

    const guard = new PublicGuard(
      createUserSession(UserRole.ANONYMOUS),
      anonymousGuard,
      routerStub
    )
    const canActivate = await guard.canActivate(activatedRoute, routerState)
      .pipe(first())
      .toPromise()

    expect(canActivate).toEqual(new UrlTree())
    expect(routerStub.parseUrl).toHaveBeenCalledTimes(1)
  })
})
