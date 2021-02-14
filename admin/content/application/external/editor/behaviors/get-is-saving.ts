import { BehaviorSubject } from "rxjs"

export function construct() {
  const isSaving = new BehaviorSubject<boolean>(false)
  isSaving.subscribe()
  return () => isSaving
}

export default construct()

export type GetIsSaving = ReturnType<typeof construct>
