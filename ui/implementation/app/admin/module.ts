import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { AdminContainer } from "@funk/ui/app/admin/container"
import { AppFireModule } from "@funk/ui/app/fire.module"
import { IonicModule } from "@ionic/angular"
import { ManagedContentModule } from "./managed-content/module"

const routes: Routes = [
  {
    path: "",
    component: AdminContainer,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AppFireModule,
    ManagedContentModule,
  ],
  declarations: [
    AdminContainer,
  ],
})
export class AdminModule
{ }
