import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { fromEvent } from "rxjs"
import { map, startWith } from "rxjs/operators"

export function construct(window: Window)
{
  const deviceWidth = fromEvent(window, "resize").pipe(
    startWith(undefined),
    map(() => window.innerWidth),
    shareReplayOnce()
  )
  deviceWidth.subscribe()
  return deviceWidth
}

export type DeviceWidth = ReturnType<typeof construct>
