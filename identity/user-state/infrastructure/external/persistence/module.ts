import { ModuleWithProviders, NgModule } from "@angular/core"
import { construct as constructGetById } from "@funk/identity/user-state/application/external/behaviors/persistence/get-by-id"
import { construct as constructListenById } from "@funk/identity/user-state/application/external/behaviors/persistence/listen-by-id"
import { construct as constructMarshall } from "@funk/identity/user-state/application/external/behaviors/persistence/marshall"
import { construct as constructPopulate } from "@funk/identity/user-state/application/external/behaviors/persistence/populate"
import { construct as constructSetById } from "@funk/identity/user-state/application/external/behaviors/persistence/set-by-id"
import { construct as constructUpdateById } from "@funk/identity/user-state/application/external/behaviors/persistence/update-by-id"
import {
  GET_USER_STATE_BY_ID,
  LISTEN_FOR_USER_STATE_BY_ID,
  MARSHALL_USER_STATE,
  POPULATE_USER_STATE,
  SET_USER_STATE_BY_ID,
  UPDATE_USER_STATE_BY_ID,
} from "@funk/identity/user-state/infrastructure/external/persistence/tokens"
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
export class UserStatePersistenceModule {
  public static withProviders(): ModuleWithProviders<
    UserStatePersistenceModule
  > {
    return {
      ngModule: UserStatePersistenceModule,
      providers: [
        {
          provide: LISTEN_FOR_USER_STATE_BY_ID,
          useFactory: constructListenById,
          deps: [LISTEN_BY_ID, POPULATE_USER_STATE],
        },
        {
          provide: GET_USER_STATE_BY_ID,
          useFactory: constructGetById,
          deps: [GET_BY_ID, POPULATE_USER_STATE],
        },
        {
          provide: SET_USER_STATE_BY_ID,
          useFactory: constructSetById,
          deps: [SET_BY_ID, MARSHALL_USER_STATE],
        },
        {
          provide: UPDATE_USER_STATE_BY_ID,
          useFactory: constructUpdateById,
          deps: [UPDATE_BY_ID, MARSHALL_USER_STATE],
        },
        {
          provide: POPULATE_USER_STATE,
          useFactory: constructPopulate,
          deps: [POPULATE],
        },
        {
          provide: MARSHALL_USER_STATE,
          useFactory: constructMarshall,
          deps: [MARSHALL],
        },
      ],
    }
  }
}
