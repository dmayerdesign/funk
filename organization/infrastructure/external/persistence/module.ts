import { ModuleWithProviders, NgModule } from "@angular/core"
import { construct as constructListenById } from "@funk/organization/application/external/behaviors/persistence/listen-by-id"
import { construct as constructPopulate } from "@funk/organization/application/external/behaviors/persistence/populate"
import {
  LISTEN_FOR_ORGANIZATION_BY_ID,
  POPULATE_ORGANIZATION,
} from "@funk/organization/infrastructure/external/persistence/tokens"
import { PersistenceModule } from "@funk/persistence/infrastructure/external/module"
import {
  LISTEN_BY_ID,
  POPULATE,
} from "@funk/persistence/infrastructure/external/tokens"

@NgModule({
  imports: [PersistenceModule],
})
export class OrganizationPersistenceModule {
  public static withProviders(): ModuleWithProviders<
    OrganizationPersistenceModule
  > {
    return {
      ngModule: OrganizationPersistenceModule,
      providers: [
        {
          provide: LISTEN_FOR_ORGANIZATION_BY_ID,
          useFactory: constructListenById,
          deps: [LISTEN_BY_ID, POPULATE_ORGANIZATION],
        },
        {
          provide: POPULATE_ORGANIZATION,
          useFactory: constructPopulate,
          deps: [POPULATE],
        },
      ],
    }
  }
}
