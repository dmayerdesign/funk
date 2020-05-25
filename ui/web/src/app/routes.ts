import { Routes } from "@angular/router"
import { AnonymousGuard } from "@funk/ui/core/identity/anonymous-guard"
import { NotFoundComponent } from "@funk/ui/web/app/not-found/component"

const routes: Routes = [
  {
    path: "sink",
    loadChildren: () => import("@funk/ui/web/app/kitchen-sink/module")
      .then((mod) => mod.KitchenSinkModule),
    canActivate: [ AnonymousGuard ],
  },
  {
    path: "admin",
    loadChildren: () => import("@funk/ui/web/app/admin/module")
      .then((mod) => mod.AdminModule),
    canActivate: [ AnonymousGuard ],
  },
  {
    path: "shop",
    loadChildren: () => import("@funk/ui/web/app/shop/module")
      .then((mod) => mod.ShopModule),
  },
  {
    path: "account",
    loadChildren: () => import("@funk/ui/web/app/account-management/module")
      .then((mod) => mod.AccountManagementModule),
    canActivate: [ AnonymousGuard ],
  },
  {
    path: "sign-up",
    loadChildren: () => import("@funk/ui/web/app/sign-up/module")
      .then((mod) => mod.SignUpModule),
  },
  {
    path: "",
    redirectTo: "/sign-up",
    pathMatch: "full",
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
]

export default routes
