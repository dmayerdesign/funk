import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AccountManagementComponent } from '@funk/ui/web/app/account-management/component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AccountManagementComponent },
    ]),
  ],
  declarations: [
    AccountManagementComponent,
  ],
})
export class AccountManagementModule
{ }
