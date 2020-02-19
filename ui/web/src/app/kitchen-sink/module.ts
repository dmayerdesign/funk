import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { IonicModule } from '@ionic/angular'
import { KitchenSinkComponent } from './component'

const routes: Routes = [
  {
    path: '',
    component: KitchenSinkComponent,
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
    KitchenSinkComponent,
  ],
})
export class KitchenSinkModule
{ }
