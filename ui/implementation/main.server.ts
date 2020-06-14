import { enableProdMode } from "@angular/core"

import { environment } from "@funk/ui/environments/environment"

if (environment.production)
{
  enableProdMode()
}

export { AppServerModule } from "@funk/ui/app/server.module"

export { renderModule, renderModuleFactory } from "@angular/platform-server"
