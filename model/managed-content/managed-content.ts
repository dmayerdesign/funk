import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { ImageGroup } from "../image/image-group"

export interface ManagedText extends DatabaseDocument {
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

export interface ManagedImage extends DatabaseDocument {
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
