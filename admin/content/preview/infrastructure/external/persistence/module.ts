import { ModuleWithProviders, NgModule } from "@angular/core"
import { construct as constructDeleteContentPreviewById } from "@funk/admin/content/preview/application/external/behaviors/persistence/delete-by-id"
import { construct as constructGetById } from "@funk/admin/content/preview/application/external/behaviors/persistence/get-by-id"
import { construct as constructList } from "@funk/admin/content/preview/application/external/behaviors/persistence/list"
import { construct as constructListenById } from "@funk/admin/content/preview/application/external/behaviors/persistence/listen-by-id"
import { construct as constructMarshall } from "@funk/admin/content/preview/application/external/behaviors/persistence/marshall"
import { construct as constructPopulate } from "@funk/admin/content/preview/application/external/behaviors/persistence/populate"
import { construct as constructSetById } from "@funk/admin/content/preview/application/external/behaviors/persistence/set-by-id"
import { construct as constructUpdateById } from "@funk/admin/content/preview/application/external/behaviors/persistence/update-by-id"
import {
  DELETE_CONTENT_PREVIEW_BY_ID,
  GET_CONTENT_PREVIEW_BY_ID,
  LISTEN_FOR_CONTENT_PREVIEW_BY_ID,
  LIST_CONTENT_PREVIEW,
  MARSHALL_CONTENT_PREVIEW,
  POPULATE_CONTENT_PREVIEW,
  SET_CONTENT_PREVIEW_BY_ID,
  UPDATE_CONTENT_PREVIEW_BY_ID,
} from "@funk/admin/content/preview/infrastructure/external/persistence/tokens"
import { USER_STATE } from "@funk/identity/infrastructure/external/tokens"
import { MARSHALL_USER_STATE } from "@funk/identity/user-state/infrastructure/external/persistence/tokens"
import { PersistenceModule } from "@funk/persistence/infrastructure/external/module"
import {
  MARSHALL,
  POPULATE,
  UPDATE_BY_ID,
} from "@funk/persistence/infrastructure/external/tokens"

@NgModule({
  imports: [PersistenceModule],
  declarations: [],
  exports: [],
})
export class ContentPreviewPersistenceModule {
  public static withProviders(): ModuleWithProviders<
    ContentPreviewPersistenceModule
  > {
    return {
      ngModule: ContentPreviewPersistenceModule,
      providers: [
        {
          provide: LISTEN_FOR_CONTENT_PREVIEW_BY_ID,
          useFactory: constructListenById,
          deps: [POPULATE_CONTENT_PREVIEW, USER_STATE],
        },
        {
          provide: LIST_CONTENT_PREVIEW,
          useFactory: constructList,
          deps: [POPULATE_CONTENT_PREVIEW, USER_STATE],
        },
        {
          provide: GET_CONTENT_PREVIEW_BY_ID,
          useFactory: constructGetById,
          deps: [POPULATE_CONTENT_PREVIEW, USER_STATE],
        },
        {
          provide: SET_CONTENT_PREVIEW_BY_ID,
          useFactory: constructSetById,
          deps: [UPDATE_BY_ID, MARSHALL_USER_STATE, USER_STATE],
        },
        {
          provide: UPDATE_CONTENT_PREVIEW_BY_ID,
          useFactory: constructUpdateById,
          deps: [UPDATE_BY_ID, MARSHALL_USER_STATE, USER_STATE],
        },
        {
          provide: POPULATE_CONTENT_PREVIEW,
          useFactory: constructPopulate,
          deps: [POPULATE],
        },
        {
          provide: MARSHALL_CONTENT_PREVIEW,
          useFactory: constructMarshall,
          deps: [MARSHALL],
        },
        {
          provide: DELETE_CONTENT_PREVIEW_BY_ID,
          useFactory: constructDeleteContentPreviewById,
          deps: [UPDATE_BY_ID, MARSHALL_USER_STATE, USER_STATE],
        },
      ],
    }
  }
}
