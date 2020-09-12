import { enableProdMode } from "@angular/core"
import { IS_PRODUCTION } from '@funk/config'

if (IS_PRODUCTION)
{
  enableProdMode()
}

export { AppServerModule } from "@funk/ui/app/server.module"

export { renderModule, renderModuleFactory } from "@angular/platform-server"
