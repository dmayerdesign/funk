import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { AdminContainer } from "@funk/admin/infrastructure/external/container"
import { ImportSkusContainer } from "@funk/admin/infrastructure/external/import-skus/container"
import { ManagedContentModule } from "@funk/admin/infrastructure/external/managed-content/module"
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
    ManagedContentModule,
  ],
  declarations: [AdminContainer, ImportSkusContainer],
})
export class AdminModule {}
