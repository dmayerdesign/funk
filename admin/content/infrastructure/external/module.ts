import { CommonModule, DOCUMENT } from "@angular/common"
import { ModuleWithProviders, NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CKEditorModule } from "@ckeditor/ckeditor5-angular"
import { construct as constructService } from "@funk/admin/content/application/external/editor/service"
import { ContentComponent } from "@funk/admin/content/infrastructure/external/component"
import { ContentEditorContainer } from "@funk/admin/content/infrastructure/external/editor/container"
import {
    HTML_GET_INNER_TEXT,
    MANAGED_CONTENT_EDITOR_SERVICE
} from "@funk/admin/content/infrastructure/external/tokens"
import { USER_SESSION } from "@funk/identity/infrastructure/external/tokens"
import {
    GET_BY_ID,
    LISTEN_BY_ID,
    SET_BY_ID,
    UPDATE_BY_ID
} from "@funk/persistence/infrastructure/external/tokens"
import { construct as constructGetInnerText } from "@funk/ui/infrastructure/external/helpers/html/get-inner-text"
import { DEVICE_WIDTH } from "@funk/ui/infrastructure/external/tokens"
import { AlertController, IonicModule } from "@ionic/angular"
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
  declarations: [ContentEditorContainer, ContentComponent],
  exports: [ContentEditorContainer, ContentComponent],
})
export class ContentModule {
  public static withProviders(): ModuleWithProviders<ContentModule> {
    return {
      ngModule: ContentModule,
      providers: [
        {
          provide: HTML_GET_INNER_TEXT,
          useFactory: constructGetInnerText,
          deps: [DOCUMENT],
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
            AlertController,
            DEVICE_WIDTH,
          ],
        },
      ],
    }
  }
}
