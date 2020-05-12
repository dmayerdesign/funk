import { Inject, Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Identity, IDENTITY } from '@funk/ui/core/identity/interface'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AnonymousGuard implements CanActivate
{
  constructor(
    @Inject(IDENTITY) private _auth: Identity,
    private _router: Router,
  )
  { }

  public canActivate(): Observable<true | UrlTree>
  {
    return this._auth.user$.pipe(
      map((user) => (!!user && !user.isAnonymous)
        || this._router.parseUrl('/'))
    )
  }
}
