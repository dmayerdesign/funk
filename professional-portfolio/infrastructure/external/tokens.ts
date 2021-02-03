import { InjectionToken } from "@angular/core"
import { ContactOwner } from "@funk/contact/infrastructure/external/cloud-functions/owner"

export const CONTACT_OWNER = new InjectionToken<ContactOwner>("CONTACT_OWNER")
