import { enableProdMode } from "@angular/core"
import { IS_PRODUCTION } from "@funk/configuration"

if (IS_PRODUCTION) {
  enableProdMode()
}

export { renderModule, renderModuleFactory } from "@angular/platform-server"
export { AppServerModule } from "@funk/ui/app/server.module"
