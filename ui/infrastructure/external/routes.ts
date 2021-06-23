import { Routes } from "@angular/router"
import { AnonymousGuard } from "@funk/identity/infrastructure/external/anonymous-guard"
import { NotFoundComponent } from "@funk/ui/not-found/infrastructure/external/component"

const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("@funk/secrets/infrastructure/external/module").then(
        (mod) => mod.AdminModule,
      ),
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
    path: "",
    loadChildren: () =>
      import("@funk/meshell-sturgis/meshell-sturgis.module").then(
        (mod) => mod.MeshellSturgisModule,
      ),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
]

export default routes
