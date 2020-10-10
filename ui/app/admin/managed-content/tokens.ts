import { InjectionToken } from "@angular/core"
import { ManagedContentEditorService } from "@funk/ui/core/admin/managed-content/editor/service"
import { HtmlGetInnerText } from "@funk/ui/helpers/html/get-inner-text"

export const MANAGED_CONTENT_EDITOR_SERVICE = new InjectionToken<
  ManagedContentEditorService
>("MANAGED_CONTENT_EDITOR_SERVICE")
export const HTML_GET_INNER_TEXT = new InjectionToken<HtmlGetInnerText>(
  "HTML_GET_INNER_TEXT"
)
