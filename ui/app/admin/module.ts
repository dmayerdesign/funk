import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { AdminContainer } from "@funk/ui/app/admin/container"
import { ImportSkusContainer } from "@funk/ui/app/admin/import-skus/container"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import atlas from "@funk/ui/configuration/atlas"
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
