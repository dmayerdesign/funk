import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ContentModule } from "@funk/admin/content/infrastructure/external/module"
import { SignInContainer } from "@funk/auth/infrastructure/external/sign-in/container"
import { SignUpFormComponent } from "@funk/auth/infrastructure/external/sign-in/sign-up-form.component"
import { IonicModule } from "@ionic/angular"

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
    ContentModule,
  ],
  declarations: [SignInContainer, SignUpFormComponent],
})
export class SignInModule {}
