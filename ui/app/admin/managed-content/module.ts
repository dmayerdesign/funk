import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ManagedContentComponent } from "@funk/ui/app/admin/managed-content/component"
import { ManagedContentEditorContainer } from
  "@funk/ui/app/admin/managed-content/editor/container"
import { IonicModule } from "@ionic/angular"
import { construct as constructService } from
  "@funk/ui/core/admin/managed-content/editor/service"
import { MANAGED_CONTENT_EDITOR_SERVICE } from "@funk/ui/app/admin/managed-content/tokens"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import { LISTEN_BY_ID, GET_BY_ID, SET_BY_ID, UPDATE_BY_ID } from "@funk/ui/app/persistence/tokens"
import { ClickOutsideModule } from "ng-click-outside"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClickOutsideModule,
  ],
  declarations: [
    ManagedContentEditorContainer,
    ManagedContentComponent,
  ],
  exports: [
    ManagedContentEditorContainer,
    ManagedContentComponent,
  ],
  providers: [
    {
      provide: MANAGED_CONTENT_EDITOR_SERVICE,
      useFactory: constructService,
      deps: [
        USER_SESSION,
        LISTEN_BY_ID,
        GET_BY_ID,
        SET_BY_ID,
        UPDATE_BY_ID,
      ],
    },
  ],
})
export class ManagedContentModule
{ }
