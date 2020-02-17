import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { AdminContainer } from '@funk/ui/web/app/admin/container'
import { ManagedContentComponent } from '@funk/ui/web/app/admin/managed-content/component'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { IonicModule } from '@ionic/angular'

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
    IonicModule,
    RouterModule.forChild(routes),
    AppFireModule,
  ],
  declarations: [
    AdminContainer,
    ManagedContentComponent,
  ],
})
export class AdminModule
{ }
