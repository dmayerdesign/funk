import { InjectionToken } from "@angular/core"
import { ManagedContentEditorService } from "@funk/ui/core/admin/managed-content/editor/service"

export const MANAGED_CONTENT_EDITOR_SERVICE =
  new InjectionToken<ManagedContentEditorService>("MANAGED_CONTENT_EDITOR_SERVICE")
