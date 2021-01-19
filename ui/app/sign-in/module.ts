import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { SignInContainer } from "@funk/ui/app/sign-in/container"
import { SignUpFormComponent } from "@funk/ui/app/sign-in/sign-up-form.component"
import { IonicModule } from "@ionic/angular"
import { ManagedContentModule } from "../admin/managed-content/module"

const routes: Routes = [
  {
    path: "",
    component: SignInContainer,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    ManagedContentModule,
  ],
  declarations: [SignInContainer, SignUpFormComponent],
})
export class SignInModule {}
