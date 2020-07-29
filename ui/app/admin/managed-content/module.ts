import { CommonModule, DOCUMENT } from "@angular/common"
import { NgModule, ModuleWithProviders } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CKEditorModule } from "@ckeditor/ckeditor5-angular"
import { ManagedContentComponent } from "@funk/ui/app/admin/managed-content/component"
import { ManagedContentEditorContainer } from
  "@funk/ui/app/admin/managed-content/editor/container"
import { construct as constructService } from
  "@funk/ui/core/admin/managed-content/editor/service"
import {
  MANAGED_CONTENT_EDITOR_SERVICE,
  HTML_GET_INNER_TEXT,
} from "@funk/ui/app/admin/managed-content/tokens"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import { LISTEN_BY_ID, GET_BY_ID, SET_BY_ID, UPDATE_BY_ID } from "@funk/ui/app/persistence/tokens"
import { construct as constructGetInnerText } from "@funk/ui/helpers/html/get-inner-text"
import { IonicModule } from "@ionic/angular"
import { ClickOutsideModule } from "ng-click-outside"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClickOutsideModule,
    CKEditorModule,
  ],
  declarations: [
    ManagedContentEditorContainer,
    ManagedContentComponent,
  ],
  exports: [
    ManagedContentEditorContainer,
    ManagedContentComponent,
  ],
})
export class ManagedContentModule
{
  public static withProviders(): ModuleWithProviders
  {
    return {
      ngModule: ManagedContentModule,
      providers: [
        {
          provide: HTML_GET_INNER_TEXT,
          useFactory: constructGetInnerText,
          deps: [ DOCUMENT ],
        },
        {
          provide: MANAGED_CONTENT_EDITOR_SERVICE,
          useFactory: constructService,
          deps: [
            USER_SESSION,
            LISTEN_BY_ID,
            GET_BY_ID,
            SET_BY_ID,
            UPDATE_BY_ID,
            HTML_GET_INNER_TEXT,
          ],
        },
      ],
    }
  }
}
