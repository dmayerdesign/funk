import { fromEvent } from "rxjs"
import { startWith, map } from "rxjs/operators"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"

export function construct(window: Window)
{
  return fromEvent(window, "resize").pipe(
    startWith(undefined),
    map(() => window.innerWidth),
    shareReplayOnce()
  )
}

export type DeviceWidth = ReturnType<typeof construct>
