import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { INTEGRATION_TEST } from "@funk/configuration"
import { construct as constructGetById } from "@funk/persistence/application/external/behaviors/get-by-id"
import { construct as constructListByIds } from "@funk/persistence/application/external/behaviors/list-by-ids"
import { construct as constructListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import marshall from "@funk/persistence/application/external/behaviors/marshall"
import { construct as constructPopulate } from "@funk/persistence/application/external/behaviors/populate"
import { construct as constructQueryCollectionForMeta } from "@funk/persistence/application/external/behaviors/query-collection-for-metadata"
import { construct as constructSetById } from "@funk/persistence/application/external/behaviors/set-by-id"
import { construct as constructUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"
import {
  GET_BY_ID,
  LISTEN_BY_ID,
  LIST_BY_IDS,
  MARSHALL,
  POPULATE,
  QUERY_COLLECTION_FOR_METADATA,
  SET_BY_ID,
  UPDATE_BY_ID,
} from "@funk/persistence/infrastructure/external/tokens"
import { construct as constructTestGetById } from "@funk/test/plugins/external/persistence/behaviors/get-by-id"
import { construct as constructTestListByIds } from "@funk/test/plugins/external/persistence/behaviors/list-by-ids"
import { construct as constructTestListenById } from "@funk/test/plugins/external/persistence/behaviors/listen-by-id"
import { construct as constructTestPopulate } from "@funk/test/plugins/external/persistence/behaviors/populate"
import { construct as constructTestQueryCollectionForMeta } from "@funk/test/plugins/external/persistence/behaviors/query-collection-for-metadata"
import { construct as constructTestSetById } from "@funk/test/plugins/external/persistence/behaviors/set-by-id"
import { construct as constructTestUpdateById } from "@funk/test/plugins/external/persistence/behaviors/update-by-id"

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: GET_BY_ID,
      useFactory: INTEGRATION_TEST ? constructTestGetById : constructGetById,
      deps: [AngularFirestore],
    },
    {
      provide: LISTEN_BY_ID,
      useFactory: INTEGRATION_TEST
        ? constructTestListenById
        : constructListenById,
      deps: [AngularFirestore],
    },
    {
      provide: LIST_BY_IDS,
      useFactory: INTEGRATION_TEST
        ? constructTestListByIds
        : constructListByIds,
      deps: [AngularFirestore],
    },
    {
      provide: POPULATE,
      useFactory: INTEGRATION_TEST ? constructTestPopulate : constructPopulate,
      deps: [GET_BY_ID, LIST_BY_IDS],
    },
    {
      provide: MARSHALL,
      useValue: marshall,
    },
    {
      provide: QUERY_COLLECTION_FOR_METADATA,
      useFactory: INTEGRATION_TEST
        ? constructTestQueryCollectionForMeta
        : constructQueryCollectionForMeta,
      deps: [AngularFirestore],
    },
    {
      provide: SET_BY_ID,
      useFactory: INTEGRATION_TEST ? constructTestSetById : constructSetById,
      deps: [AngularFirestore],
    },
    {
      provide: UPDATE_BY_ID,
      useFactory: INTEGRATION_TEST
        ? constructTestUpdateById
        : constructUpdateById,
      deps: [AngularFirestore],
    },
  ],
})
export class PersistenceModule {}
