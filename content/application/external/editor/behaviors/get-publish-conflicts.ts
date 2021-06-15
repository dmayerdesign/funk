import { PublishConflict } from "@funk/content/application/external/editor/publish-conflict"
import { BehaviorSubject } from "rxjs"

export function construct() {
  const publishConflicts = new BehaviorSubject<PublishConflict[] | []>([])
  publishConflicts.subscribe()
  return () => publishConflicts
}

export default construct()

export type GetPublishConflicts = ReturnType<typeof construct>
