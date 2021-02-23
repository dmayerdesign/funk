import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export type FlashType = 'success'|'error'|'info';

export interface Flash {
  message: string;
  type: FlashType;
}

@Injectable({ providedIn: 'root' })
export class UiService {

  public transition$ = new ReplaySubject<boolean>(1);
  public flash$ = new ReplaySubject<Flash>(1);
  public flashCancel$ = new ReplaySubject<any>(1);

  flash(message: string, type: FlashType = 'success') {
    this.flash$.next({message, type});
    setTimeout(() => {
      this.flashCancel$.next();
    }, 5000);
  }
}
