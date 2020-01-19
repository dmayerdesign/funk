import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { AdminContainer } from '@funk/ui/web/app/admin/container'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { AppMaterialModule } from '@funk/ui/web/app/material.module'

const routes: Routes = [
  {
    path: '',
    component: AdminContainer,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    AppFireModule,
  ],
  declarations: [
    AdminContainer,
  ],
})
export class AdminModule
{ }
