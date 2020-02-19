import { Component } from '@angular/core'
import { CONTENTS } from '@funk/model/admin/content/content'
import { ManagedContent } from '@funk/model/managed-content/managed-content'
import { AdminApi } from '@funk/ui/core/admin/api'
import { StoreApi } from '@funk/ui/core/store/api'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const MANAGED_CONTENT_PATHS = {
  testCmsDoc1: [ CONTENTS, 'test-cms-doc' ],
  testCmsDoc2: [ CONTENTS, 'test-cms-doc-2' ],
  testCmsDoc3: [ CONTENTS, 'test-cms-doc-3' ],
  testCmsDoc4: [ CONTENTS, 'test-cms-doc-4' ],
}

@Component({
  selector: 'admin',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <managed-content
          [collectionPath]="managedContentPaths.testCmsDoc1[0]"
          [documentPath]="managedContentPaths.testCmsDoc1[1]">
          <ion-title>
            {{ title | async }}
          </ion-title>
        </managed-content>
      </ion-toolbar>
    </ion-header>
    <div>
      <managed-content
        [collectionPath]="managedContentPaths.testCmsDoc2[0]"
        [documentPath]="managedContentPaths.testCmsDoc2[1]">
        <h1>
          {{ setSecretHeading | async }}
        </h1>
      </managed-content>
      <form [formGroup]="adminApi.setSecretFormGroup"
        (ngSubmit)="adminApi.setSecret()">
        <input type="text"
          placeholder="Key"
          formControlName="secretKey"
        />
        <input type="password"
          placeholder="Value"
          formControlName="secretValue"
        />
        <input type="submit"
          [style.visibility]="'hidden'"
        />
      </form>
    </div>
    <div>
      <h1>Get secret</h1>
      <form [formGroup]="adminApi.getSecretFormGroup"
        (ngSubmit)="adminApi.getSecret()">
        <input type="text"
          placeholder="Key"
          formControlName="secretKey"
        />
        <input type="submit"
          [style.visibility]="'hidden'"
        />
      </form>
    </div>
    <div>
      <code>{{ adminApi.secretShowing }}</code>
    </div>
    <button (click)="adminApi.grantSuperRole()">Grant</button>
  `,
  providers: [ AdminApi ],
})
export class AdminContainer
{
  public title = this._readManagedContent('testCmsDoc1')
  public setSecretHeading = this._readManagedContent('testCmsDoc2')
  public managedContentPaths = MANAGED_CONTENT_PATHS

  constructor(
    public adminApi: AdminApi,
    private _storeApi: StoreApi,
  )
  { }

  private _readManagedContent<ContentValueType = any>(
    key: string,
  ): Observable<ContentValueType>
  {
    return this._storeApi.getDocumentValueChanges<ManagedContent>(
      (MANAGED_CONTENT_PATHS as { [key: string]: string[] })[key][0],
      (MANAGED_CONTENT_PATHS as { [key: string]: string[] })[key][1],
    )
    .pipe(
      map((contentData) =>
        contentData && contentData.value
      )
    )
  }
}
