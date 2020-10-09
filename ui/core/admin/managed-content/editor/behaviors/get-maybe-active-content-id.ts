import { BehaviorSubject } from "rxjs"

export function construct()
{
  const maybeActiveContentId = new BehaviorSubject<string | undefined>(undefined)
  maybeActiveContentId.subscribe()
  return () => maybeActiveContentId
}

export default construct()

export type GetMaybeActiveContentId = ReturnType<typeof construct>
