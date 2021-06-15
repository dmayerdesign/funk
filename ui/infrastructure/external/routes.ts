import { Routes } from "@angular/router"
import { HOMEPAGE } from "@funk/configuration"
import { AnonymousGuard } from "@funk/identity/infrastructure/external/anonymous-guard"
import { CAN_LOAD_INTEGRATION_TEST } from "@funk/ui/infrastructure/external/tokens"
import { NotFoundComponent } from "@funk/ui/not-found/infrastructure/external/component"

const routes: Routes = [
  {
    path: "",
    redirectTo: HOMEPAGE,
    pathMatch: "full",
  },
  {
    path: "sink",
    loadChildren: () =>
      import("@funk/ui/kitchen-sink/infrastructure/external/module").then(
        (mod) => mod.KitchenSinkModule,
      ),
    canActivate: [AnonymousGuard],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("@funk/secrets/infrastructure/external/module").then(
        (mod) => mod.AdminModule,
      ),
    canActivate: [AnonymousGuard],
  },
  {
    path: "shop",
    loadChildren: () =>
      import("@funk/commerce/shop/infrastructure/external/module").then(
        (mod) => mod.ShopModule,
      ),
  },
  {
    path: "account",
    loadChildren: () =>
      import(
        "@funk/secrets/infrastructure/external/account-management/module"
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
    path: "portfolio",
    loadChildren: () =>
      import("@funk/portfolio/infrastructure/external/module").then(
        (mod) => mod.PortfolioModule,
      ),
  },
  {
    path: "test-data-visualizer",
    loadChildren: () =>
      import("@funk/test/infrastructure/external/data-visualizer/module").then(
        (mod) => mod.TestDataVisualizerModule,
      ),
    canLoad: [CAN_LOAD_INTEGRATION_TEST],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
]

export default routes
