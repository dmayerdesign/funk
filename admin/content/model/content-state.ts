import { Mutation } from "@funk/audit/model/mutation";
import { OrdinalKey } from "@funk/persistence/model/ordinal-key";
import { PrimaryKey } from "@funk/persistence/model/primary-key";

export interface ContentState {
  id: PrimaryKey
  changes: Mutation[]
  latestPublishedChangeId: OrdinalKey
}
