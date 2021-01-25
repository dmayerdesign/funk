import roleHasAdminPrivilegeOrGreater from "@funk/auth/domain/helpers/role-has-admin-privilege-or-greater"
import { UserSession } from "@funk/identity/application/external/user-session"
import { DeviceWidth } from "@funk/ui/plugins/external/layout/device-width"
import { map, pluck, shareReplay, switchMap } from "rxjs/operators"

export function construct(userSession: UserSession, deviceWidth: DeviceWidth) {
  const isAuthorized = userSession.pipe(
    pluck("auth", "claims", "role"),
    map(roleHasAdminPrivilegeOrGreater),
    switchMap((hasCorrectPrivileges) =>
      deviceWidth.pipe(
        map((widthSnapshot) => widthSnapshot > 960 && hasCorrectPrivileges),
      ),
    ),
    shareReplay(1),
  )
  isAuthorized.subscribe()
  return () => isAuthorized
}

export type GetIsAuthorized = ReturnType<typeof construct>
