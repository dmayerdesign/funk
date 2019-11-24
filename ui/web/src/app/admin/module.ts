import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { AppFireModule } from '../fire.module'
import { AppMaterialModule } from '../material.module'
import { AdminContainer } from './container'

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
export class AdminModule { }
