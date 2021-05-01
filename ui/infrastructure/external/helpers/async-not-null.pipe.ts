import { AsyncPipe } from "@angular/common"
import { OnDestroy, Pipe, PipeTransform } from "@angular/core"
import { Observable } from "rxjs"

@Pipe({ name: "asyncNotNull", pure: false })
export class AsyncNotNullPipe implements OnDestroy, PipeTransform {
  public constructor(private _asyncPipe: AsyncPipe) {}
  public ngOnDestroy(): void {
    return this._asyncPipe.ngOnDestroy()
  }
  public transform<T>(obj: Observable<T> | Promise<T>): T
  public transform<T>(obj: Observable<T> | Promise<T> | undefined): T {
    return this._asyncPipe.transform(obj) as T
  }
}
