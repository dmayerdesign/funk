import { enableProdMode } from "@angular/core"
import { CONFIGURATION } from "@funk/configuration"
import { Configuration } from "@funk/configuration/model/configuration"

if (
  CONFIGURATION === Configuration.STAGING ||
  CONFIGURATION === Configuration.PRODUCTION
) {
  enableProdMode()
}

export { renderModule, renderModuleFactory } from "@angular/platform-server"
export { AppServerModule } from "@funk/ui/ssr/infrastructure/external/server.module"
