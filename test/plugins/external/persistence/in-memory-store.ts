import http from "axios"
import { BehaviorSubject } from "rxjs"
import { STORE_SERVER_PORT } from "./configuration"

let store: Record<string, Record<string, any>>
let store$: BehaviorSubject<Record<string, Record<string, any>>>

export async function initializeStore(): Promise<void> {
  console.log("invoking initializeStore...")
  store = await getRemoteStore()
  store$ = new BehaviorSubject(store)
  store$.subscribe()
  console.log("initialized store", store)
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
  console.log("invoked reInitializeStore")
  await setRemoteStore(newStore)
  store = newStore
  store$.next(store)
  store$.subscribe()
}

async function getRemoteStore(): Promise<Record<string, Record<string, any>>> {
  return (await http.get(`http://localhost:${STORE_SERVER_PORT}`)).data
}

async function setRemoteStore(
  newStore: Record<string, Record<string, any>>,
): Promise<void> {
  await http.post(`http://localhost:${STORE_SERVER_PORT}`, newStore)
}
