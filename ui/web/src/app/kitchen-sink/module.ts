import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { VexModule } from '@dannymayer/vex'
import { AppCommonModule } from '@funk/ui/web/app/common.module'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { KitchenSinkContainer } from '@funk/ui/web/app/kitchen-sink/container'
import { createInitialState, KitchenSinkState } from '@funk/ui/web/app/kitchen-sink/state'
import { IonicModule } from '@ionic/angular'

const routes: Routes = [
  {
    path: '',
    component: KitchenSinkContainer,
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
    VexModule.forFeature<KitchenSinkState>('kitchenSink', createInitialState()),
    AppCommonModule,
  ],
  declarations: [
    KitchenSinkContainer,
  ],
})
export class KitchenSinkModule
{ }
