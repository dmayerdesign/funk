import { Routes } from "@angular/router"
import { AnonymousGuard } from "@funk/ui/app/identity/anonymous-guard"
import { NotFoundComponent } from "@funk/ui/app/not-found/component"

const routes: Routes = [
  {
    path: "",
    redirectTo: "admin",
    pathMatch: "full",
  },
  {
    path: "sink",
    loadChildren: () => import("@funk/ui/app/kitchen-sink/module")
      .then((mod) => mod.KitchenSinkModule),
    canActivate: [ AnonymousGuard ],
  },
  {
    path: "admin",
    loadChildren: () => import("@funk/ui/app/admin/module")
      .then((mod) => mod.AdminModule),
    canActivate: [ AnonymousGuard ],
  },
  {
    path: "shop",
    loadChildren: () => import("@funk/ui/app/shop/module")
      .then((mod) => mod.ShopModule),
  },
  {
    path: "account",
    loadChildren: () => import("@funk/ui/app/account-management/module")
      .then((mod) => mod.AccountManagementModule),
    canActivate: [ AnonymousGuard ],
  },
  {
    path: "sign-in",
    loadChildren: () => import("@funk/ui/app/sign-in/module")
      .then((mod) => mod.SignInModule),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
]

export default routes
