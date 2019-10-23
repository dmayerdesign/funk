import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
})
export class AppMaterialModule { }
