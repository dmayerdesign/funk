import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { CanActivate } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AnonymousGuard implements CanActivate
{
  constructor(private _auth: AngularFireAuth)
  { }

  public canActivate(): Observable<boolean>
  {
    return this._auth.user.pipe(
      map((user) => !!user && !user.isAnonymous)
    )
  }
}
