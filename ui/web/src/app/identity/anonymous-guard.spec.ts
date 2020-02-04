import { UrlTree } from '@angular/router'
import { UserRole } from '@funk/model/auth/user-role'
import { first } from 'rxjs/operators'
import { AdministratorGuard } from './administrator-guard'
import { createAuthStub, createAuthUserStub, createRouterStub,
  createStubbedAnonymousGuard } from './stubs'

describe('AnonymousGuard', () =>
{
  it('must activate if the user is SUPER', async (done) =>
  {
    const canActivate = await createStubbedAnonymousGuard(UserRole.SUPER)
      .canActivate().pipe(first()).toPromise()

    expect(canActivate).toBe(true)
    done()
  })

  it('must activate if the user is OWNER', async (done) =>
  {
    const canActivate = await createStubbedAnonymousGuard(UserRole.OWNER)
      .canActivate().pipe(first()).toPromise()

    expect(canActivate).toBe(true)
    done()
  })

  it('must activate if the user is ADMINISTRATOR', async (done) =>
  {
    const canActivate = await createStubbedAnonymousGuard(UserRole.ADMINISTRATOR)
      .canActivate().pipe(first()).toPromise()

    expect(canActivate).toBe(true)
    done()
  })

  it('must activate if the user is PUBLIC', async (done) =>
  {
    const canActivate = await createStubbedAnonymousGuard(UserRole.PUBLIC)
      .canActivate().pipe(first()).toPromise()

    expect(canActivate).toBe(true)
    done()
  })

  it('must not activate if the user is ANONYMOUS', async (done) =>
  {
    const routerStub = createRouterStub()
    spyOn(routerStub, 'parseUrl').and.callThrough()

    const guard = new AdministratorGuard(
      createAuthStub(createAuthUserStub(UserRole.ANONYMOUS)),
      routerStub,
    )
    const canActivate = await guard.canActivate().pipe(first()).toPromise()

    expect(canActivate).toEqual(new UrlTree())
    expect(routerStub.parseUrl).toHaveBeenCalledTimes(1)
    done()
  })
})
