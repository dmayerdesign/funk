import { Router, Event, ActivationEnd } from "@angular/router"
import { filter, pluck, map } from "rxjs/operators"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"

export function construct(
  router: Router
)
{
  return router.events
    .pipe(
      filter<Event, ActivationEnd>(
        ((event) => event instanceof ActivationEnd) as (value: Event) => value is ActivationEnd
      ),
      pluck("snapshot"),
      map((snapshot) =>
      {
        let deepestChild = snapshot.firstChild
        while (!!deepestChild?.firstChild)
        {
          deepestChild = deepestChild.firstChild
        }
        return deepestChild
      }),
      pluck("data", "title"),
      shareReplayOnce()
    )
}

export type PageTitle = ReturnType<typeof construct>
