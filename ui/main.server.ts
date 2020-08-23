import { enableProdMode } from "@angular/core"

import { configuration } from "@funk/ui/configurations/configuration"

if (configuration.production)
{
  enableProdMode()
}

export { AppServerModule } from "@funk/ui/app/server.module"

export { renderModule, renderModuleFactory } from "@angular/platform-server"
