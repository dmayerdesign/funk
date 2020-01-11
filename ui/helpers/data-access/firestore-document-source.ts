import { AngularFirestoreDocument } from '@angular/fire/firestore'
import { DataConsumer } from '@funk/model/data-access/data-consumer'
import { Observable, PartialObserver, Subject } from 'rxjs'
import { shareReplay, takeUntil } from 'rxjs/operators'

export default class FirestoreDocumentSource<DataType> implements DataConsumer<DataType>
{
  public data$: Observable<DataType | undefined>
  private _disconnect$ = new Subject<void>()

  constructor(
    doc: AngularFirestoreDocument<DataType>,
    observerOrSuccessHandler?: PartialObserver<DataType> | ((value: DataType | undefined) => any)
  )
  {
    this.data$ = doc.valueChanges().pipe(
      takeUntil(this._disconnect$),
      shareReplay(1),
    )
    this.data$.subscribe((value) =>
      typeof observerOrSuccessHandler === 'function' ? observerOrSuccessHandler(value) :
      typeof observerOrSuccessHandler === 'object' ? observerOrSuccessHandler : {})
  }

  public connect = () => this.data$
  public disconnect = () => this._disconnect$.next()
}
