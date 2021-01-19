import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { TEST_PUBLIC_USER } from "@funk/configuration"
import {
  GET_BY_ID,
  LISTEN_BY_ID,
  LIST_BY_IDS,
  POPULATE,
  QUERY_COLLECTION_FOR_METADATA,
  SET_BY_ID,
  UPDATE_BY_ID
} from "@funk/ui/app/persistence/tokens"
import { construct as constructGetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"
import { construct as constructListByIds } from "@funk/ui/plugins/persistence/behaviors/list-by-ids"
import { construct as constructListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { construct as constructPopulate } from "@funk/ui/plugins/persistence/behaviors/populate"
import { construct as constructQueryCollectionForMeta } from "@funk/ui/plugins/persistence/behaviors/query-collection-for-metadata"
import { construct as constructSetById } from "@funk/ui/plugins/persistence/behaviors/set-by-id"
import { construct as constructUpdateById } from "@funk/ui/plugins/persistence/behaviors/update-by-id"
import { construct as constructTestGetById } from "@funk/ui/test/plugins/persistence/behaviors/get-by-id"
import { construct as constructTestListByIds } from "@funk/ui/test/plugins/persistence/behaviors/list-by-ids"
import { construct as constructTestListenById } from "@funk/ui/test/plugins/persistence/behaviors/listen-by-id"
import { construct as constructTestPopulate } from "@funk/ui/test/plugins/persistence/behaviors/populate"
import { construct as constructTestQueryCollectionForMeta } from "@funk/ui/test/plugins/persistence/behaviors/query-collection-for-metadata"
import { construct as constructTestSetById } from "@funk/ui/test/plugins/persistence/behaviors/set-by-id"
import { construct as constructTestUpdateById } from "@funk/ui/test/plugins/persistence/behaviors/update-by-id"



@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: GET_BY_ID,
      useFactory: TEST_PUBLIC_USER ? constructTestGetById : constructGetById,
      deps: [AngularFirestore],
    },
    {
      provide: LISTEN_BY_ID,
      useFactory: TEST_PUBLIC_USER ? constructTestListenById : constructListenById,
      deps: [AngularFirestore],
    },
    {
      provide: LIST_BY_IDS,
      useFactory: TEST_PUBLIC_USER ? constructTestListByIds : constructListByIds,
      deps: [AngularFirestore],
    },
    {
      provide: POPULATE,
      useFactory: TEST_PUBLIC_USER ? constructTestPopulate : constructPopulate,
      deps: [GET_BY_ID, LIST_BY_IDS],
    },
    {
      provide: QUERY_COLLECTION_FOR_METADATA,
      useFactory: TEST_PUBLIC_USER ? constructTestQueryCollectionForMeta : constructQueryCollectionForMeta,
      deps: [AngularFirestore],
    },
    {
      provide: SET_BY_ID,
      useFactory: TEST_PUBLIC_USER ? constructTestSetById : constructSetById,
      deps: [AngularFirestore],
    },
    {
      provide: UPDATE_BY_ID,
      useFactory: TEST_PUBLIC_USER ? constructTestUpdateById : constructUpdateById,
      deps: [AngularFirestore],
    },
  ],
})
export class PersistenceModule {}
