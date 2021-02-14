import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ContentModule } from "@funk/admin/content/infrastructure/external/module"
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
    ContentModule,
  ],
  declarations: [KitchenSinkContainer],
})
export class KitchenSinkModule {}
