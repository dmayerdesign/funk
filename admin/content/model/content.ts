import { ImageGroup } from "@funk/image/model/image-group"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export interface BaseContent extends DatabaseDocument {}

export interface ManagedText extends BaseContent {
  type: ContentType.TEXT
  value: string
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: string
    }
  }
}

export interface ManagedHtml extends BaseContent {
  type: ContentType.HTML
  value: string
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: string
    }
  }
}

export interface ManagedImage extends BaseContent {
  type: ContentType.IMAGE
  value: ImageGroup
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: string
    }
  }
}

export enum ContentType {
  TEXT = "TEXT",
  HTML = "HTML",
  IMAGE = "IMAGE",
}

export type Content = ManagedText | ManagedHtml | ManagedImage

export const CONTENTS = "contents"
