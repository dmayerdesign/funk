import { Routes } from "@angular/router"
import { HOMEPAGE } from "@funk/configuration"
import { AnonymousGuard } from "@funk/identity/infrastructure/external/anonymous-guard"
import { NotFoundComponent } from "@funk/ui/not-found/infrastructure/external/component"

const routes: Routes = [
  {
    path: "",
    redirectTo: HOMEPAGE,
    pathMatch: "full",
  },
  {
    path: "admin",
    loadChildren: () =>
      import("@funk/admin/infrastructure/external/module").then(
        (mod) => mod.AdminModule,
      ),
    canActivate: [AnonymousGuard],
  },
  {
    path: "account",
    loadChildren: () =>
      import(
        "@funk/admin/infrastructure/external/account-management/module"
      ).then((mod) => mod.AccountManagementModule),
    canActivate: [AnonymousGuard],
  },
  {
    path: "sign-in",
    loadChildren: () =>
      import("@funk/auth/infrastructure/external/sign-in/module").then(
        (mod) => mod.SignInModule,
      ),
  },
  {
    path: "meshell-sturgis",
    loadChildren: () =>
      import(
        "@funk/meshell-sturgis/infrastructure/external/module"
      ).then((mod) => mod.MeshellSturgisModule),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
]

export default routes
