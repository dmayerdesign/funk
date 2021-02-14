import { InjectionToken } from "@angular/core"
import { ContentEditorService } from "@funk/admin/content/application/external/editor/service"
import { HtmlGetInnerText } from "@funk/ui/infrastructure/external/helpers/html/get-inner-text"

export const MANAGED_CONTENT_EDITOR_SERVICE = new InjectionToken<
  ContentEditorService
>("MANAGED_CONTENT_EDITOR_SERVICE")
export const HTML_GET_INNER_TEXT = new InjectionToken<HtmlGetInnerText>(
  "HTML_GET_INNER_TEXT",
)
