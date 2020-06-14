import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { AppCommonModule } from "@funk/ui/app/common.module"
import { AppFireModule } from "@funk/ui/app/fire.module"
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
    AppFireModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    AppCommonModule,
  ],
  declarations: [
    KitchenSinkContainer,
  ],
})
export class KitchenSinkModule
{ }
