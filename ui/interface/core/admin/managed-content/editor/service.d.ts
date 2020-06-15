import { AbstractControl } from "@angular/forms"
import { ManagedContent } from "@funk/model/managed-content/managed-content"
import { ContentPreview } from "@funk/model/managed-content/content-preview"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { GetById } from "@funk/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/plugins/persistence/actions/set-by-id"
import { construct as constructUpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { BehaviorSubject, Observable } from "rxjs"

type PublishConflict = [ ContentPreview, ManagedContent ]

export function construct(
  userSession: UserSession,
  listenById: ReturnType<typeof constructListenById>,
  getById: GetById,
  setById: ReturnType<typeof constructSetById>,
  updateById: ReturnType<typeof constructUpdateById>
): ManagedContentEditorService

export interface ManagedContentEditorService {
  isActivated: Observable<boolean>
  saving: BehaviorSubject<boolean>
  activeContentValueControl: Observable<AbstractControl | undefined>
  hasPreview: Observable<boolean>
  contentsUpdatedAfterPreview: BehaviorSubject<PublishConflict[] | []>

  manageContent(contentId: string):                 void
  saveAndClearIfEditing():                          Promise<void>
  maybePublishAll():                                Promise<void>
  publishOne(contentId: PrimaryKey):                Promise<void> // "Publish mine anyway"
  removePreview(contentId: PrimaryKey):             Promise<void> // "Discard mine"
  cancel():                                         void
  listenForPreviewOrLiveContent(contentId: string): Observable<ManagedContent | undefined>
}
