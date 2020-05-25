import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { AppFireModule } from "@funk/ui/web/app/fire.module"
import { SignUpComponent } from "./component"

const routes: Routes = [
  {
    path: "",
    component: SignUpComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    AppFireModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SignUpComponent,
  ],
})
export class SignUpModule
{ }
