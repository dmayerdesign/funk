import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ManagedContentModule } from "@funk/admin/infrastructure/external/managed-content/module"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
import { KitchenSinkContainer } from "@funk/ui/kitchen-sink/infrastructure/external/container"
import { IonicModule } from "@ionic/angular"

const routes: Routes = [
  {
    path: "",
    component: KitchenSinkContainer,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    AppCommonModule,
    ManagedContentModule,
  ],
  declarations: [KitchenSinkContainer],
})
export class KitchenSinkModule {}
