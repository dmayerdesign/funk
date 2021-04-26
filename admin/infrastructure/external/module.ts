import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ContentModule } from "@funk/admin/content/infrastructure/external/module"
import { AdminContainer } from "@funk/admin/infrastructure/external/container"
import { ImportSkusContainer } from "@funk/admin/infrastructure/external/import-skus/container"
import atlas from "@funk/ui/atlas/configuration"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"

const routes: Routes = [
  {
    path: "",
    component: AdminContainer,
    data: {
      title: atlas.admin.label,
    },
  },
]

@NgModule({
  imports: [AppCommonModule, RouterModule.forChild(routes), ContentModule],
  declarations: [AdminContainer, ImportSkusContainer],
})
export class AdminModule {}
