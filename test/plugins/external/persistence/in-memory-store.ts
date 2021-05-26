import http from "axios"
import { BehaviorSubject } from "rxjs"
import { STORE_SERVER_PORT } from "./configuration"

let store: Record<string, Record<string, any>>
let store$: BehaviorSubject<Record<string, Record<string, any>>>

export async function initializeStore(): Promise<void> {
  store = await getRemoteStore()
  store$ = new BehaviorSubject(store)
  store$.subscribe()
}

export function getStore() {
  return store
}

export function getStore$() {
  return store$
}

export async function reInitializeStore(
  newStore: Record<string, Record<string, any>>,
) {
  await setRemoteStore(newStore)
  store = newStore
  store$.next(store)
  store$.subscribe()
}

async function getRemoteStore(): Promise<Record<string, Record<string, any>>> {
  return (await http.get(`http://localhost:${STORE_SERVER_PORT}/store`)).data
}

async function setRemoteStore(
  newStore: Record<string, Record<string, any>>,
): Promise<void> {
  await http.post(`http://localhost:${STORE_SERVER_PORT}/store`, newStore)
}
