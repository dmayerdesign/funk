import { DataSource } from '@angular/cdk/collections'
import { AngularFirestoreCollection } from '@angular/fire/firestore'
import { DataConsumer } from '@funk/model/data-access/data-consumer'
import { Observable, PartialObserver, Subject } from 'rxjs'
import { shareReplay, takeUntil } from 'rxjs/operators'

export default class FirestoreCollectionSource<DataType>
  implements DataConsumer<DataType[]>, DataSource<DataType>
{
  public data$: Observable<DataType[]>
  private _disconnect$ = new Subject<void>()

  constructor(
    collection: AngularFirestoreCollection<DataType>,
    observerOrSuccessHandler?: PartialObserver<DataType[]> | ((value: DataType[]) => any)
  )
  {
    this.data$ = collection.valueChanges().pipe(
      takeUntil(this._disconnect$),
      shareReplay(1),
    )
    this.data$.subscribe((value) =>
      typeof observerOrSuccessHandler === 'function' ? observerOrSuccessHandler(value) :
      typeof observerOrSuccessHandler === 'object' ? observerOrSuccessHandler : undefined)
  }

  public connect = () => this.data$
  public disconnect = () => this._disconnect$.next()
}
