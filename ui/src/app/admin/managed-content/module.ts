import { CommonModule } from "@angular/common"
import { ModuleWithProviders, NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ManagedContentComponent } from "@funk/ui/app/admin/managed-content/component"
import { ManagedContentEditorContainer } from
  "@funk/ui/app/admin/managed-content/editor/container"
import { ManagedContentEditorService } from
  "@funk/ui/app/admin/managed-content/editor/service"
import { AppFireModule } from "@funk/ui/app/fire.module"
import { IonicModule } from "@ionic/angular"
import { ClickOutsideModule } from "ng-click-outside"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AppFireModule,
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
})
export class ManagedContentModule
{
  public static withProviders(): ModuleWithProviders
  {
    return {
      ngModule: ManagedContentModule,
      providers: [
        ManagedContentEditorService,
      ],
    }
  }
}
