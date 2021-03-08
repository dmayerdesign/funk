import { InjectionToken } from "@angular/core"
import { DomGetInnerText } from "@funk/ui/infrastructure/external/helpers/dom/get-inner-text"

export const DOM_GET_INNER_TEXT = new InjectionToken<DomGetInnerText>(
  "DOM_GET_INNER_TEXT",
)
