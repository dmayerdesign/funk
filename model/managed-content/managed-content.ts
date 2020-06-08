import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { ImageGroup } from "@funk/model/image/image-group"

export interface BaseManagedContent extends DatabaseDocument {
}

export interface ManagedText extends BaseManagedContent {
  type: ManagedContentType.TEXT
  value: string
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: string
    }
  }
}

export interface ManagedImage extends BaseManagedContent {
  type: ManagedContentType.IMAGE
  value: ImageGroup
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: string
    }
  }
}

export enum ManagedContentType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
}

export type ManagedContent = ManagedText | ManagedImage

export const CONTENTS = "contents"
