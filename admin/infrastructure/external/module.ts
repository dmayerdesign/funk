import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ContentModule } from "@funk/admin/content/infrastructure/external/module"
import { AdminContainer } from "@funk/admin/infrastructure/external/container"
import { ImportSkusContainer } from "@funk/admin/infrastructure/external/import-skus/container"
import atlas from "@funk/ui/atlas/configuration"
import { IonicModule } from "@ionic/angular"

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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ContentModule,
  ],
  declarations: [AdminContainer, ImportSkusContainer],
})
export class AdminModule {}
