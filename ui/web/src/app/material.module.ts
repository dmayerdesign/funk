import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class MaterialModule { }
