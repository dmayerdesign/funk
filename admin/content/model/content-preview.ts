import { Content } from "@funk/admin/content/model/content"
import { Instant } from "@funk/time/model/instant"

export interface ContentPreview {
  createdAt: Instant
  content: Content
}
