import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import atlas from "@funk/ui/app/atlas/atlas"
import { ContactContainer } from "@funk/ui/app/poetry/contact/container"
import { PoetryContainer } from "@funk/ui/app/poetry/container"
import { IonicModule } from "@ionic/angular"

const routes: Routes = [
  {
    path: "",
    component: PoetryContainer,
    children: [
      {
        path: "contact",
        component: ContactContainer,
        data: {
          title: atlas.poetry.__atlas__.contact.label,
        },
      },
    ],
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
  declarations: [
    PoetryContainer,
    ContactContainer,
  ],
})
export class PoetryModule
{ }
