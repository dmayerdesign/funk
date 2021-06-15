import { ModuleWithProviders, NgModule } from "@angular/core"
import { construct as constructGetById } from "@funk/content/application/external/behaviors/persistence/get-by-id"
import { construct as constructListenById } from "@funk/content/application/external/behaviors/persistence/listen-by-id"
import { construct as constructMarshall } from "@funk/content/application/external/behaviors/persistence/marshall"
import { construct as constructPopulate } from "@funk/content/application/external/behaviors/persistence/populate"
import { construct as constructSetById } from "@funk/content/application/external/behaviors/persistence/set-by-id"
import { construct as constructUpdateById } from "@funk/content/application/external/behaviors/persistence/update-by-id"
import {
  GET_CONTENT_BY_ID,
  LISTEN_FOR_CONTENT_BY_ID,
  MARSHALL_CONTENT,
  POPULATE_CONTENT,
  SET_CONTENT_BY_ID,
  UPDATE_CONTENT_BY_ID,
} from "@funk/content/infrastructure/external/persistence/tokens"
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
export class ContentPersistenceModule {
  public static withProviders(): ModuleWithProviders<ContentPersistenceModule> {
    return {
      ngModule: ContentPersistenceModule,
      providers: [
        {
          provide: LISTEN_FOR_CONTENT_BY_ID,
          useFactory: constructListenById,
          deps: [LISTEN_BY_ID, POPULATE_CONTENT],
        },
        {
          provide: GET_CONTENT_BY_ID,
          useFactory: constructGetById,
          deps: [GET_BY_ID, POPULATE_CONTENT],
        },
        {
          provide: SET_CONTENT_BY_ID,
          useFactory: constructSetById,
          deps: [SET_BY_ID, MARSHALL_CONTENT],
        },
        {
          provide: UPDATE_CONTENT_BY_ID,
          useFactory: constructUpdateById,
          deps: [UPDATE_BY_ID, MARSHALL_CONTENT],
        },
        {
          provide: POPULATE_CONTENT,
          useFactory: constructPopulate,
          deps: [POPULATE],
        },
        {
          provide: MARSHALL_CONTENT,
          useFactory: constructMarshall,
          deps: [MARSHALL],
        },
      ],
    }
  }
}
