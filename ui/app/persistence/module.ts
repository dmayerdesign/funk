import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import {
  GET_BY_ID,
  LISTEN_BY_ID,
  LIST_BY_IDS,
  POPULATE,
  QUERY_COLLECTION_FOR_METADATA,
  SET_BY_ID,
  UPDATE_BY_ID,
} from "@funk/ui/app/persistence/tokens"
import { construct as constructGetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"
import { construct as constructListByIds } from "@funk/ui/plugins/persistence/behaviors/list-by-ids"
import { construct as constructListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { construct as constructPopulate } from "@funk/ui/plugins/persistence/behaviors/populate"
import { construct as constructQueryCollectionForMeta } from "@funk/ui/plugins/persistence/behaviors/query-collection-for-metadata"
import { construct as constructSetById } from "@funk/ui/plugins/persistence/behaviors/set-by-id"
import { construct as constructUpdateById } from "@funk/ui/plugins/persistence/behaviors/update-by-id"

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: LISTEN_BY_ID,
      useFactory: constructListenById,
      deps: [AngularFirestore],
    },
    {
      provide: LIST_BY_IDS,
      useFactory: constructListByIds,
      deps: [AngularFirestore],
    },
    {
      provide: GET_BY_ID,
      useFactory: constructGetById,
      deps: [AngularFirestore],
    },
    {
      provide: SET_BY_ID,
      useFactory: constructSetById,
      deps: [AngularFirestore],
    },
    {
      provide: UPDATE_BY_ID,
      useFactory: constructUpdateById,
      deps: [AngularFirestore],
    },
    {
      provide: POPULATE,
      useFactory: constructPopulate,
      deps: [GET_BY_ID, LIST_BY_IDS],
    },
    {
      provide: QUERY_COLLECTION_FOR_METADATA,
      useFactory: constructQueryCollectionForMeta,
      deps: [AngularFirestore],
    },
  ],
})
export class PersistenceModule {}
