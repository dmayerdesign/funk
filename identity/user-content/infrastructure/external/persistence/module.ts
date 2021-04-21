import { ModuleWithProviders, NgModule } from "@angular/core"
import { construct as constructGetById } from "@funk/identity/user-content/application/external/behaviors/persistence/get-by-id"
import { construct as constructListenById } from "@funk/identity/user-content/application/external/behaviors/persistence/listen-by-id"
import { construct as constructMarshall } from "@funk/identity/user-content/application/external/behaviors/persistence/marshall"
import { construct as constructPopulate } from "@funk/identity/user-content/application/external/behaviors/persistence/populate"
import { construct as constructSetById } from "@funk/identity/user-content/application/external/behaviors/persistence/set-by-id"
import { construct as constructUpdateById } from "@funk/identity/user-content/application/external/behaviors/persistence/update-by-id"
import {
  GET_USER_CONTENT_BY_ID,
  LISTEN_FOR_USER_CONTENT_BY_ID,
  MARSHALL_USER_CONTENT,
  POPULATE_USER_CONTENT,
  SET_USER_CONTENT_BY_ID,
  UPDATE_USER_CONTENT_BY_ID,
} from "@funk/identity/user-content/infrastructure/external/persistence/tokens"
import { PersistenceModule } from "@funk/persistence/infrastructure/external/module"
import {
  GET_BY_ID,
  LISTEN_BY_ID,
  MARSHALL,
  POPULATE,
  SET_BY_ID,
  UPDATE_BY_ID,
} from "@funk/persistence/infrastructure/external/tokens"

@NgModule({
  imports: [PersistenceModule],
  declarations: [],
  exports: [],
})
export class UserContentPersistenceModule {
  public static withProviders(): ModuleWithProviders<
    UserContentPersistenceModule
  > {
    return {
      ngModule: UserContentPersistenceModule,
      providers: [
        {
          provide: LISTEN_FOR_USER_CONTENT_BY_ID,
          useFactory: constructListenById,
          deps: [LISTEN_BY_ID, POPULATE_USER_CONTENT],
        },
        {
          provide: GET_USER_CONTENT_BY_ID,
          useFactory: constructGetById,
          deps: [GET_BY_ID, POPULATE_USER_CONTENT],
        },
        {
          provide: SET_USER_CONTENT_BY_ID,
          useFactory: constructSetById,
          deps: [SET_BY_ID, MARSHALL_USER_CONTENT],
        },
        {
          provide: UPDATE_USER_CONTENT_BY_ID,
          useFactory: constructUpdateById,
          deps: [UPDATE_BY_ID, MARSHALL_USER_CONTENT],
        },
        {
          provide: POPULATE_USER_CONTENT,
          useFactory: constructPopulate,
          deps: [POPULATE],
        },
        {
          provide: MARSHALL_USER_CONTENT,
          useFactory: constructMarshall,
          deps: [MARSHALL],
        },
      ],
    }
  }
}
