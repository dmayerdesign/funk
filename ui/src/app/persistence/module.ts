import { ModuleWithProviders, NgModule } from "@angular/core"
import {
  GET_BY_ID,
  LISTEN_BY_ID,
  POPULATE,
  QUERY_COLLECTION_FOR_METADATA,
  SET_BY_ID,
  UPDATE_BY_ID,
} from "@funk/ui/app/persistence/tokens"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { construct as constructGetById } from "@funk/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/plugins/persistence/actions/set-by-id"
import { construct as constructUpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { construct as constructPopulate } from "@funk/plugins/persistence/actions/populate"
import { construct as constructQueryCollectionForMeta } from
  "@funk/plugins/persistence/actions/query-collection-for-metadata"
import { AngularFirestore } from "@angular/fire/firestore"
import { CommonModule } from "@angular/common"
import { AppFireModule } from "@funk/ui/app/fire.module"

@NgModule({
  imports: [
    CommonModule,
    AppFireModule,
  ],
})
export class PersistenceModule
{
  public static forRoot(): ModuleWithProviders
  {
    return {
      ngModule: PersistenceModule,
      providers: [
        {
          provide: LISTEN_BY_ID,
          useFactory: constructListenById,
          deps: [ AngularFirestore ],
        },
        {
          provide: GET_BY_ID,
          useFactory: constructGetById,
          deps: [ AngularFirestore ],
        },
        {
          provide: SET_BY_ID,
          useFactory: constructSetById,
          deps: [ AngularFirestore ],
        },
        {
          provide: UPDATE_BY_ID,
          useFactory: constructUpdateById,
          deps: [ AngularFirestore ],
        },
        {
          provide: POPULATE,
          useFactory: constructPopulate,
          deps: [ AngularFirestore ],
        },
        {
          provide: QUERY_COLLECTION_FOR_METADATA,
          useFactory: constructQueryCollectionForMeta,
          deps: [ AngularFirestore ],
        },
      ],
    }
  }
}
