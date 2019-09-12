import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
})
export class MaterialModule { }
