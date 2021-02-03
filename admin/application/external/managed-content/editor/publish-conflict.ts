import { ContentPreview } from "@funk/admin/domain/managed-content/content-preview"
import { ManagedContent } from "@funk/admin/domain/managed-content/managed-content"

export type PublishConflict = [ContentPreview, ManagedContent]
