import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import { AppCommonModule } from "@funk/ui/app/common.module"
import { KitchenSinkContainer } from "@funk/ui/app/kitchen-sink/container"
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
  declarations: [
    KitchenSinkContainer,
  ],
})
export class KitchenSinkModule
{ }
