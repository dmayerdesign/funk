import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { Populate } from "@funk/admin/content/preview/application/external/behaviors/persistence/populate"
import { asPromise } from "@funk/helpers/as-promise"
import { ignoreNullish, maybePluck } from "@funk/helpers/rxjs-shims"
import { UserContent$ as UserContentChanges } from "@funk/identity/application/external/user-content"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { values } from "lodash"
import { map, switchMap } from "rxjs/operators"

export function construct(
  populate: Populate,
  userContentChanges: UserContentChanges,
) {
  return async function (): Promise<ContentPreview[]> {
    return await asPromise(
      userContentChanges.pipe(
        maybePluck("contentPreviews"),
        ignoreNullish(),
        map<Record<PrimaryKey, ContentPreview>, ContentPreview[]>(values),
        switchMap(
          (contentPreviews) =>
            Promise.all(contentPreviews.map(populate)) as Promise<
              ContentPreview[]
            >,
        ),
      ),
    )
  }
}

export type List = ReturnType<typeof construct>
