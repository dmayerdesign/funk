import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { AccountManagementComponent } from "@funk/ui/app/account-management/component"
import { IonicModule } from "@ionic/angular"

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      { path: "", component: AccountManagementComponent },
    ]),
  ],
  declarations: [
    AccountManagementComponent,
  ],
})
export class AccountManagementModule
{ }
