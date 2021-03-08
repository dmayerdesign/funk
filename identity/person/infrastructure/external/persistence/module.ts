import { ModuleWithProviders, NgModule } from "@angular/core"
import { construct as constructGetById } from "@funk/identity/person/application/external/behaviors/persistence/get-by-id"
import { construct as constructListenById } from "@funk/identity/person/application/external/behaviors/persistence/listen-by-id"
import { construct as constructMarshall } from "@funk/identity/person/application/external/behaviors/persistence/marshall"
import { construct as constructPopulate } from "@funk/identity/person/application/external/behaviors/persistence/populate"
import { construct as constructSetById } from "@funk/identity/person/application/external/behaviors/persistence/set-by-id"
import { construct as constructUpdateById } from "@funk/identity/person/application/external/behaviors/persistence/update-by-id"
import {
  GET_PERSON_BY_ID,
  LISTEN_FOR_PERSON_BY_ID,
  MARSHALL_PERSON,
  POPULATE_PERSON,
  SET_PERSON_BY_ID,
  UPDATE_PERSON_BY_ID,
} from "@funk/identity/person/infrastructure/external/persistence/tokens"
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
export class PersonPersistenceModule {
  public static withProviders(): ModuleWithProviders<PersonPersistenceModule> {
    return {
      ngModule: PersonPersistenceModule,
      providers: [
        {
          provide: LISTEN_FOR_PERSON_BY_ID,
          useFactory: constructListenById,
          deps: [LISTEN_BY_ID, POPULATE_PERSON],
        },
        {
          provide: GET_PERSON_BY_ID,
          useFactory: constructGetById,
          deps: [GET_BY_ID, POPULATE_PERSON],
        },
        {
          provide: SET_PERSON_BY_ID,
          useFactory: constructSetById,
          deps: [SET_BY_ID, MARSHALL_PERSON],
        },
        {
          provide: UPDATE_PERSON_BY_ID,
          useFactory: constructUpdateById,
          deps: [UPDATE_BY_ID, MARSHALL_PERSON],
        },
        {
          provide: POPULATE_PERSON,
          useFactory: constructPopulate,
          deps: [POPULATE],
        },
        {
          provide: MARSHALL_PERSON,
          useFactory: constructMarshall,
          deps: [MARSHALL],
        },
      ],
    }
  }
}
