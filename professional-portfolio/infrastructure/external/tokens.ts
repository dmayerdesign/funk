import { InjectionToken } from "@angular/core"
import { ContactOwner } from "@funk/contact/infrastructure/external/cloud-functions/owner"

export const CONTACT_OWNER = new InjectionToken<ContactOwner>("CONTACT_OWNER")
// export const LIST_POSTS_BY_TAXONOMY = new InjectionToken<ListPostsByTaxonomy>("LIST_POSTS_BY_TAXONOMY")
