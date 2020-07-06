import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { AppFireModule } from "@funk/ui/app/fire.module"
import { SignInContainer } from "@funk/ui/app/sign-in/container"
import { SignUpFormComponent } from "@funk/ui/app/sign-in/sign-up-form.component"
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
    AppFireModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [
    SignInContainer,
    SignUpFormComponent,
  ],
})
export class SignInModule
{ }